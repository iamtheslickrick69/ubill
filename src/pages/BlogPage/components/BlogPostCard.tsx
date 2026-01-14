import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';
import { BlogPost } from '../data/blogPosts';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface BlogPostCardProps {
  post: BlogPost;
  language: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, language }) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Get category display name
  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case 'case-study':
        return 'Case Study';
      case 'nem-3':
        return 'NEM 3.0';
      case 'solar':
        return 'Solar';
      case 'utility-laws':
        return 'Utility Laws';
      case 'wildfires':
        return 'Wildfires';
      default:
        return category;
    }
  };

  // Get realistic image based on category if no image is provided
  const getRealisticImage = (category: string) => {
    switch (category) {
      case 'case-study':
        return 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
      case 'wildfires':
        return 'https://images.unsplash.com/photo-1601058268499-e52e4a74e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
      case 'solar':
        return 'https://images.unsplash.com/photo-1592833159057-6facceb4d300?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
      case 'utility-laws':
        return 'https://images.unsplash.com/photo-1618044733300-9472054094ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
      case 'nem-3':
        return 'https://images.unsplash.com/photo-1605980625600-88d6ec1bb688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
      default:
        return 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
    }
  };

  // Use the provided image URL or a realistic one based on category
  const imageUrl = post.imageUrl || getRealisticImage(post.category);

  return (
    <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="h-full overflow-hidden hover:shadow-dark-card-hover transition-shadow duration-300 bg-dark-card border-dark-border">
        <AspectRatio ratio={16/9} className="overflow-hidden">
          <img 
            src={imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          />
        </AspectRatio>
        <CardContent className="p-6">
          <div className="mb-3">
            <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded">
              {getCategoryDisplayName(post.category)}
            </span>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">{post.title}</h3>
          <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex justify-between items-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{post.date}</span>
          </div>
          <Link 
            to={`/blog/${post.slug}`} 
            className="text-primary font-medium hover:underline transition-colors flex items-center"
          >
            Read More
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default BlogPostCard;
