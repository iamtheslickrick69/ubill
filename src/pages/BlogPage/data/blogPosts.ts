
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  imageUrl: string;
  date: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Case Study: Kassie A. — Why Did I Get a $1,275 Settlement Bill from SCE?",
    slug: "case-study-kassie-settlement-bill",
    excerpt: "When Kassie received a shocking $1,275 'settlement' bill from Southern California Edison, she was confused and frustrated. Here's what happened and how she resolved it.",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    date: "June 10, 2023",
    category: "case-study"
  },
  {
    id: 2,
    title: "Case Study: Eric B. — How a $2,260 Energy Bill Was Hidden in Plain Sight",
    slug: "case-study-eric-hidden-charges",
    excerpt: "Eric's solar agreement looked great on paper, but his bills kept rising. Discover how complex billing structures hid $2,260 in annual charges he never knew about.",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    date: "July 15, 2023",
    category: "case-study"
  },
  {
    id: 3,
    title: "What $92 in One Month Really Means (Hint: It's Not Just $1.00)",
    slug: "what-92-dollars-really-means",
    excerpt: "The true cost of seemingly small monthly charges, and how these deceptively minor expenses compound into thousands over your system's lifetime.",
    imageUrl: "https://images.unsplash.com/photo-1618044733300-9472054094ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    date: "August 3, 2023",
    category: "utility-laws"
  },
  {
    id: 4,
    title: "California's (Obvious) but Unspoken Energy Crisis",
    slug: "california-unspoken-energy-crisis",
    excerpt: "Beyond the headlines: How California's aging grid, climate policy, and monopolistic utility structures are creating the perfect storm for homeowners.",
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    date: "September 21, 2023",
    category: "utility-laws"
  },
  {
    id: 5,
    title: "California's Mandatory Solar Law: What Homeowners Were Never Told",
    slug: "california-mandatory-solar-law",
    excerpt: "Since 2020, all new California homes require solar. But the implementation has created unexpected consequences for homeowners. Here's what you should know.",
    imageUrl: "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    date: "October 7, 2023",
    category: "solar"
  },
  {
    id: 6,
    title: "Wildfires, Power Outages, and Energy Anxiety in California",
    slug: "wildfires-power-outages-energy-anxiety",
    excerpt: "How wildfire seasons are reshaping California's relationship with energy, and what homeowners can do to protect themselves without overspending.",
    imageUrl: "https://images.unsplash.com/photo-1602544207601-d6bc5e40de68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    date: "November 12, 2023",
    category: "wildfires"
  },
  {
    id: 7,
    title: "The Rise and Fall of SunPower: A Cautionary Tale",
    slug: "sunpower-cautionary-tale",
    excerpt: "Once a dominant player in residential solar, SunPower's struggles reflect broader issues in the industry. We analyze what went wrong and lessons for homeowners.",
    imageUrl: "https://images.unsplash.com/photo-1592833159057-6facceb4d300?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    date: "December 8, 2023",
    category: "solar"
  },
  {
    id: 8,
    title: "2025 California Energy & Battery Update: What You Need to Know",
    slug: "2025-california-energy-battery-update",
    excerpt: "Looking ahead: Upcoming policy changes, technology trends, and market shifts that will impact California homeowners in the next year.",
    imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    date: "January 15, 2024",
    category: "utility-laws"
  },
  {
    id: 9,
    title: "NEM 3.0: California's New Solar Rules, Explained",
    slug: "nem-3-california-solar-rules-explained",
    excerpt: "A straightforward breakdown of NEM 3.0, how it differs from previous programs, and what it means for both existing and new solar customers.",
    imageUrl: "https://images.unsplash.com/photo-1605980625600-88d6ec1bb688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    date: "February 2, 2024",
    category: "nem-3"
  }
];
