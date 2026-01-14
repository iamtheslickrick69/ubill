
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BlogFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const BlogFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory 
}: BlogFiltersProps) => {
  return (
    <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between">
      <div className="md:w-2/3">
        <Input
          type="search"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="md:w-1/3">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="case-study">Case Studies</SelectItem>
            <SelectItem value="nem-3">NEM 3.0</SelectItem>
            <SelectItem value="solar">Solar</SelectItem>
            <SelectItem value="utility-laws">Utility Laws</SelectItem>
            <SelectItem value="wildfires">Wildfires</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BlogFilters;
