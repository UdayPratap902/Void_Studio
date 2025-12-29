import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import Order from '@/lib/models/Order';
import WebhookEvent from '@/lib/models/WebhookEvent';

async function verifyWebhookSignature(body, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(body);
  const digest = hmac.digest('hex');

  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

export async function POST(request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature') || '';
    const eventId = request.headers.get('x-razorpay-event-id') || '';

    const isValidSignature = await verifyWebhookSignature(
      rawBody,
      signature,
      process.env.WEBHOOK_SECRET || ''
    );

    if (!isValidSignature) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const webhookPayload = JSON.parse(rawBody);
    const { event, payload } = webhookPayload;

    await dbConnect();

    // Check if this event was already processed (idempotency)
    const existingEvent = await WebhookEvent.findOne({
      eventId,
    });

    if (existingEvent?.processed) {
      console.log('Webhook already processed:', eventId);
      return NextResponse.json(
        { success: true, message: 'Webhook already processed' },
        { status: 200 }
      );
    }

    let webhookEvent = existingEvent;
    if (!webhookEvent) {
      webhookEvent = await WebhookEvent.create({
        eventId,
        eventType: event,
        payload,
        razorpayOrderId: payload?.order?.entity?.id,
        razorpayPaymentId: payload?.payment?.entity?.id,
      });
    }

    // Process payment events
    if (event === 'payment.captured') {
      const paymentEntity = payload?.payment?.entity;
      const orderEntity = payload?.order?.entity;

      if (paymentEntity && orderEntity) {
        const order = await Order.findOneAndUpdate(
          { razorpayOrderId: orderEntity.id },
          {
            razorpayPaymentId: paymentEntity.id,
            status: 'captured',
            updatedAt: new Date(),
          },
          { new: true }
        );

        if (!order) {
          console.error('Order not found for payment:', paymentEntity.id);
        }
      }
    } else if (event === 'payment.failed') {
      const paymentEntity = payload?.payment?.entity;

      if (paymentEntity?.order_id) {
        await Order.findOneAndUpdate(
          { razorpayOrderId: paymentEntity.order_id },
          {
            status: 'failed',
            updatedAt: new Date(),
          }
        );
      }
    }

    // Mark webhook as processed
    webhookEvent.processed = true;
    webhookEvent.processedAt = new Date();
    await webhookEvent.save();

    return NextResponse.json(
      { success: true, message: 'Webhook processed' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      {
        error: 'Webhook processing failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}