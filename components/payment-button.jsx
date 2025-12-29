'use client';

import { useState } from 'react';
import Script from 'next/script';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function PaymentButton({
  amount,
  plan,
  userId = 'guest_' + Date.now(),
  userEmail,
  onSuccess,
  onError,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const initiatePayment = async () => {
    if (!userEmail || !userEmail.includes('@')) {
      setError('Please enter a valid email address first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const orderResponse = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          email: userEmail,
          userId,
          plan,
          description: `VoidStudio ${plan} Plan`,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await orderResponse.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.razorpayOrderId,
        name: 'VoidStudio',
        description: `${plan} Plan`,
        image: '/logo.png',
        prefill: {
          email: userEmail,
        },
        config: {
          display: {
            blocks: {
              upi: {
                name: 'Pay using UPI',
                instruments: [
                  {
                    method: 'upi',
                  },
                ],
              },
            },
            sequence: ['block.upi'],
            preferences: {
              show_default_blocks: false,
            },
          },
        },
        handler: async function (response) {
          try {
            const verifyResponse = await fetch('/api/orders/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                email: userEmail,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok || !verifyData.success) {
              throw new Error('Payment verification failed');
            }

            if (onSuccess) {
              onSuccess(response.razorpay_payment_id, response.razorpay_order_id);
            } else {
              window.location.href = '/payment/success';
            }
          } catch (err) {
            const errorMessage =
              err instanceof Error ? err.message : 'Verification failed';
            setError(errorMessage);
            if (onError) {
              onError(errorMessage);
            }
          }
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
      };

      const razorpayCheckout = new window.Razorpay(options);
      razorpayCheckout.open();

      razorpayCheckout.on('payment.failed', function (response) {
        const errorMessage = `Payment failed: ${response.error.description}`;
        setError(errorMessage);
        if (onError) {
          onError(errorMessage);
        }
        setIsLoading(false);
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Payment initiation failed';
      setError(errorMessage);
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div>
        <Button
          onClick={initiatePayment}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Pay with UPI'
          )}
        </Button>
        {error && (
          <p className="mt-2 text-sm text-red-500 text-center">{error}</p>
        )}
      </div>
    </>
  );
}