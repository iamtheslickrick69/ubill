
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlogPostCard from './BlogPostCard';
import { BlogPost } from '../data/blogPosts';

interface BlogGridProps {
  posts: BlogPost[];
  language: string;
}

const BlogGrid = ({ posts, language }: BlogGridProps) => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {posts.length > 0 ? (
        <motion.div 
          key="grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0 }}
        >
          {posts.map((post) => (
            <BlogPostCard 
              key={post.id} 
              post={post} 
              language={language} 
            />
          ))}
        </motion.div>
      ) : (
        <motion.div 
          key="empty"
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p className="text-lg text-muted-foreground">No articles found matching your search.</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlogGrid;
