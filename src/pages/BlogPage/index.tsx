
import React, { useState, useContext, useEffect } from 'react';
import { LanguageContext } from '@/App';
import { blogPosts } from './data/blogPosts';

// Imported components
import BlogHeader from './components/BlogHeader';
import BlogFilters from './components/BlogFilters';
import BlogGrid from './components/BlogGrid';
import BlogPagination from './components/BlogPagination';
import UploadBillButton from './components/UploadBillButton';

const POSTS_PER_PAGE = 6;

const BlogPage = () => {
  const { language } = useContext(LanguageContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    // Scroll to top when page changes
    window.scrollTo(0, 0);
  }, [currentPage]);
  
  // Filter blog posts based on search query and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-dark pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <BlogHeader />
        
        {/* Search and Filter */}
        <BlogFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        {/* Blog posts grid */}
        <BlogGrid posts={currentPosts} language={language} />
        
        {/* Pagination */}
        <BlogPagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          handlePageChange={handlePageChange} 
        />
      </div>
      
      {/* Floating Upload Button */}
      <UploadBillButton language={language} />
    </div>
  );
};

export default BlogPage;
