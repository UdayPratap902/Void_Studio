'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ThreeDBackground from '@/components/3d-background';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: 'The Future of Web Design: 3D Experiences',
      excerpt:
        'Exploring how three-dimensional elements are transforming the way users interact with websites and creating immersive digital experiences.',
      date: '2025-01-15',
      readTime: '5 min read',
      category: 'Design',
    },
    {
      id: 2,
      title: 'Building High-Performance React Applications',
      excerpt:
        'Best practices and optimization techniques for creating lightning-fast React applications that scale.',
      date: '2025-01-10',
      readTime: '8 min read',
      category: 'Development',
    },
    {
      id: 3,
      title: 'UI/UX Trends to Watch in 2025',
      excerpt:
        'From micro-interactions to AI-powered personalization, discover the trends shaping the future of digital design.',
      date: '2025-01-05',
      readTime: '6 min read',
      category: 'Design',
    },
    {
      id: 4,
      title: 'The Rise of Serverless Architecture',
      excerpt:
        'How serverless computing is changing the game for scalable, cost-effective web applications.',
      date: '2024-12-28',
      readTime: '7 min read',
      category: 'Technology',
    },
    {
      id: 5,
      title: 'Creating Accessible Web Experiences',
      excerpt:
        'Why accessibility matters and practical steps to make your digital products usable by everyone.',
      date: '2024-12-20',
      readTime: '5 min read',
      category: 'Development',
    },
    {
      id: 6,
      title: 'Mastering Modern CSS: Grid and Flexbox',
      excerpt:
        'A comprehensive guide to creating complex, responsive layouts with CSS Grid and Flexbox.',
      date: '2024-12-15',
      readTime: '10 min read',
      category: 'Development',
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
                Our Blog
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Insights, tutorials, and thoughts on design, development, and
              digital innovation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="relative py-16 px-6 pb-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 group-hover:bg-clip-text transition-all">
                  {post.title}
                </h3>
                <p className="text-gray-400 mb-6 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}