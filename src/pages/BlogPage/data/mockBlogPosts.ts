
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  imageUrl?: string;
  date: string;
  category: string;
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Understanding Your Electricity Bill: A Comprehensive Guide",
    slug: "understanding-electricity-bill",
    excerpt: "Learn how to read your electricity bill and understand all the charges that appear on it. We break down the complex jargon into easy-to-understand explanations.",
    imageUrl: "https://images.unsplash.com/photo-1592833167665-ebf9d5e5f2be?q=80&w=1200",
    date: "June 15, 2023",
    category: "billEducation"
  },
  {
    id: 2,
    title: "Time-of-Use vs. Tiered Rate Plans: Which is Right for You?",
    slug: "time-of-use-vs-tiered-rate-plans",
    excerpt: "Discover the differences between time-of-use and tiered rate plans, and learn which might save you more money based on your household's energy consumption patterns.",
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200",
    date: "July 3, 2023",
    category: "ratePlans"
  },
  {
    id: 3,
    title: "Is Your Home Ready for Solar? Key Factors to Consider",
    slug: "home-ready-for-solar",
    excerpt: "Before investing in solar panels, assess whether your home meets these important criteria. From roof orientation to local regulations, we cover all the essentials.",
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200",
    date: "July 28, 2023",
    category: "solarReadiness"
  },
  {
    id: 4,
    title: "10 Simple Ways to Reduce Your Summer Electricity Bill",
    slug: "reduce-summer-electricity-bill",
    excerpt: "Beat the heat without breaking the bank! These practical tips can help you stay cool while keeping your energy costs under control during the hottest months.",
    imageUrl: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=1200",
    date: "August 12, 2023",
    category: "savings"
  },
  {
    id: 5,
    title: "Decoding Energy Surcharges and Hidden Fees",
    slug: "decoding-energy-surcharges",
    excerpt: "Many consumers are surprised by unexpected charges on their utility bills. Learn what these mysterious line items actually mean and why you're being charged for them.",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200",
    date: "September 5, 2023",
    category: "billEducation"
  },
  {
    id: 6,
    title: "Net Energy Metering 3.0: What California Homeowners Need to Know",
    slug: "net-energy-metering-3",
    excerpt: "California's new NEM 3.0 policy changes how solar customers are compensated for excess energy. Understand the impacts and how to optimize your system under the new rules.",
    imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200",
    date: "October 18, 2023",
    category: "ratePlans"
  },
  {
    id: 7,
    title: "How to Calculate Your Solar Payback Period",
    slug: "calculate-solar-payback-period",
    excerpt: "Wondering how long it will take for solar panels to pay for themselves? Learn how to calculate your specific payback period based on your energy usage, local rates, and available incentives.",
    imageUrl: "https://images.unsplash.com/photo-1660121621151-c7e30fc17832?q=80&w=1200",
    date: "November 7, 2023",
    category: "solarReadiness"
  },
  {
    id: 8,
    title: "Winter Energy Saving Strategies for California Homes",
    slug: "winter-energy-saving-strategies",
    excerpt: "Even in sunny California, winter brings increased energy costs. Implement these tailored strategies to keep your home comfortable without the high utility bills.",
    imageUrl: "https://images.unsplash.com/photo-1518486501783-cec30780e104?q=80&w=1200",
    date: "December 12, 2023",
    category: "savings"
  }
];
