'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import ThreeDBackground from '@/components/3d-background';
import { Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import PaymentButton from '@/components/payment-button';

export default function PricingPage() {
  const [email, setEmail] = useState('');

  const plans = [
    {
      name: 'Starter',
      price: 30000,
      description: 'Perfect for small projects and startups',
      features: [
        'Responsive Website',
        'Up to 5 Pages',
        'Basic SEO',
        'Mobile Optimized',
        '1 Month Support',
        'Contact Form',
      ],
      popular: false,
    },
    {
      name: 'Standard',
      price: 60000,
      description: 'Ideal for growing businesses',
      features: [
        'Everything in Starter',
        'Up to 15 Pages',
        'Advanced SEO',
        'CMS Integration',
        '3 Months Support',
        'Analytics Setup',
        'API Integration',
        'Custom Animations',
      ],
      popular: true,
    },
    {
      name: 'Premium',
      price: 130000,
      description: 'For enterprises and complex projects',
      features: [
        'Everything in Standard',
        'Unlimited Pages',
        'E-commerce Ready',
        'Custom Backend',
        '6 Months Support',
        'Performance Optimization',
        'Security Audit',
        '3D Animations',
        'Payment Gateway',
        'Priority Support',
      ],
      popular: false,
    },
  ];

  return (
    <div className="relative">
      <ThreeDBackground />

      {/* Header */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Simple Pricing
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Choose the plan that fits your needs. All prices in INR.
            </p>
            <div className="max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email for payment"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative py-16 px-6 pb-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`relative p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-2 border-purple-500'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    {plan.description}
                  </p>
                  <div className="mb-2">
                    <span className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                      ₹{(plan.price / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">One-time payment</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <PaymentButton
                  amount={plan.price}
                  plan={plan.name}
                  userEmail={email}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}