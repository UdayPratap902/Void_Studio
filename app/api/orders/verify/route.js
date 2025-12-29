import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import Order from '@/lib/models/Order';

function verifySignature(orderId, paymentId, signature, secret) {
  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  return expectedSignature === signature;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, email } =
      body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !email) {
      return NextResponse.json(
        { error: 'Missing required verification data' },
        { status: 400 }
      );
    }

    const isSignatureValid = verifySignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      process.env.RAZORPAY_KEY_SECRET || ''
    );

    if (!isSignatureValid) {
      return NextResponse.json(
        { error: 'Payment signature verification failed' },
        { status: 401 }
      );
    }

    await dbConnect();

    const order = await Order.findOneAndUpdate(
      {
        razorpayOrderId,
        email,
      },
      {
        razorpayPaymentId,
        razorpaySignature,
        status: 'captured',
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Payment verified successfully',
        order: {
          id: order._id.toString(),
          status: order.status,
          amount: order.amount,
          plan: order.plan,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      {
        error: 'Payment verification failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}