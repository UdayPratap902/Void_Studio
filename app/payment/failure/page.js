'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { XCircle, Home, RotateCcw } from 'lucide-react';

export default function PaymentFailurePage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/20 to-black" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-2xl w-full p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center"
        >
          <XCircle className="w-12 h-12 text-white" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
            Payment Failed
          </span>
        </h1>

        <p className="text-xl text-gray-300 mb-2">
          We couldn't process your payment
        </p>
        <p className="text-gray-400 mb-8">
          Don't worry, no charges were made to your account. Please try again or
          contact us if the issue persists.
        </p>

        <div className="p-6 rounded-xl bg-white/5 border border-white/10 mb-8">
          <h3 className="font-semibold text-white mb-2">Common Issues</h3>
          <ul className="text-sm text-gray-400 space-y-2 text-left max-w-md mx-auto">
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>Insufficient balance in your UPI account</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>UPI PIN entered incorrectly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>Network connectivity issues</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>Payment timeout</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/pricing">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <RotateCcw className="mr-2 w-5 h-5" />
              Try Again
            </Button>
          </Link>
          <Link href="/">
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 hover:bg-white/10 text-white"
            >
              <Home className="mr-2 w-5 h-5" />
              Back to Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}