'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ThreeDBackground from '@/components/3d-background';
import { ArrowRight, Sparkles, Zap, Rocket, Code, Palette, Monitor } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Web Development',
      description: 'Cutting-edge web applications with modern frameworks',
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile experiences',
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'UI/UX Design',
      description: 'Stunning interfaces that users love',
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'Branding',
      description: 'Complete brand identity and strategy',
    },
  ];

  return (
    <div className="relative">
      <ThreeDBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">Welcome to the Future</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Digital Experiences
              </span>
              <br />
              <span className="text-white">Beyond Imagination</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              We craft futuristic digital solutions that transform visions into reality.
              From cutting-edge web apps to stunning mobile experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg group"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white/10 text-white px-8 py-6 text-lg backdrop-blur-sm"
                >
                  Our Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                What We Do
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive digital services to elevate your brand
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-white/10 backdrop-blur-sm text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl" />
            <div className="relative z-10">
              <Zap className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Let's create something extraordinary together. Choose a plan that fits your needs.
              </p>
              <Link href="/pricing">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}