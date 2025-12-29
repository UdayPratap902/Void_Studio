import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { v4 as uuid } from 'uuid';
import dbConnect from '@/lib/db';
import Order from '@/lib/models/Order';

const razorpayInstance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, email, userId, plan, description } = body;

    if (!amount || amount <= 0 || !email || !userId || !plan) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Generate a shorter receipt ID (max 40 chars)
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.random().toString(36).substring(2, 8);
    const receipt = `rcpt_${timestamp}_${random}`;

    const amountInPaisa = Math.floor(amount * 100); // Convert to paisa

    const razorpayOrder = await razorpayInstance.orders.create({
      amount: amountInPaisa,
      currency: 'INR',
      receipt,
      notes: {
        plan,
        description: description || 'VoidStudio Payment',
        userId,
      },
    });

    const order = await Order.create({
      userId,
      email,
      amount,
      currency: 'INR',
      razorpayOrderId: razorpayOrder.id,
      status: 'pending',
      receipt,
      plan,
      notes: {
        description: description || 'VoidStudio Payment',
      },
    });

    return NextResponse.json(
      {
        success: true,
        orderId: order._id.toString(),
        razorpayOrderId: razorpayOrder.id,
        amount: amountInPaisa,
        currency: 'INR',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to create order',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}