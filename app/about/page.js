'use client';

import { motion } from 'framer-motion';
import ThreeDBackground from '@/components/3d-background';
import { Users, Target, Award, Zap } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Mission Driven',
      description:
        'We exist to push the boundaries of digital experiences and help businesses thrive in the digital age.',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Quality First',
      description:
        'Every project we deliver meets the highest standards of quality, performance, and design excellence.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Innovation',
      description:
        'We stay ahead of the curve, leveraging cutting-edge technologies to deliver future-ready solutions.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Client Focus',
      description:
        'Your success is our success. We work closely with you to understand and exceed your expectations.',
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
                About VoidStudio
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We're a team of passionate designers and developers creating
              futuristic digital experiences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                VoidStudio was founded with a simple belief: digital experiences
                should be extraordinary, not ordinary. We saw too many businesses
                settling for generic solutions that failed to capture their unique
                vision.
              </p>
              <p>
                Our team brings together years of experience in design,
                development, and digital strategy. We've worked with startups,
                scale-ups, and enterprises across various industries, always
                pushing the boundaries of what's possible.
              </p>
              <p>
                Today, we're proud to be at the forefront of digital innovation,
                creating experiences that not only look stunning but deliver real
                business results. Every project we take on is an opportunity to
                craft something truly exceptional.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-16 px-6 pb-32">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Our Values
              </span>
            </h2>
            <p className="text-gray-400 text-lg">What drives us every day</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {value.title}
                </h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}