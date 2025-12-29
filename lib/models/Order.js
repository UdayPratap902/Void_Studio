import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'INR',
      enum: ['INR'],
    },
    razorpayOrderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    razorpayPaymentId: {
      type: String,
      sparse: true,
    },
    razorpaySignature: {
      type: String,
      sparse: true,
    },
    status: {
      type: String,
      enum: ['pending', 'captured', 'failed', 'cancelled'],
      default: 'pending',
      index: true,
    },
    receipt: {
      type: String,
      required: true,
      unique: true,
    },
    plan: {
      type: String,
      required: true,
    },
    notes: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    webhookEventId: {
      type: String,
      sparse: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;