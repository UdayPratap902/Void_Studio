'use client';

import { motion } from 'framer-motion';
import ThreeDBackground from '@/components/3d-background';
import { Code, Smartphone, Palette, Zap, Globe, Database } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Web Development',
      description:
        'Custom web applications built with cutting-edge technologies like React, Next.js, and Node.js',
      features: [
        'Responsive Design',
        'SEO Optimization',
        'Performance Tuning',
        'API Integration',
      ],
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Mobile Development',
      description:
        'Native and cross-platform mobile apps that deliver exceptional user experiences',
      features: [
        'iOS & Android',
        'React Native',
        'Push Notifications',
        'Offline Support',
      ],
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'UI/UX Design',
      description:
        'Beautiful, intuitive interfaces designed with user experience at the forefront',
      features: [
        'User Research',
        'Wireframing',
        'Prototyping',
        'Design Systems',
      ],
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Branding',
      description:
        'Complete brand identity design including logos, color schemes, and brand guidelines',
      features: [
        'Logo Design',
        'Brand Strategy',
        'Visual Identity',
        'Style Guides',
      ],
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Digital Marketing',
      description:
        'Strategic digital marketing campaigns to grow your online presence',
      features: [
        'SEO Strategy',
        'Content Marketing',
        'Social Media',
        'Analytics',
      ],
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Cloud Solutions',
      description:
        'Scalable cloud infrastructure and deployment solutions for modern applications',
      features: [
        'AWS/Azure/GCP',
        'CI/CD Pipelines',
        'DevOps',
        'Monitoring',
      ],
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
                Our Services
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-16 px-6 pb-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}