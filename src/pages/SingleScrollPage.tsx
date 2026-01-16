import React, { useState, useEffect, useMemo, useContext } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '@/App';
import { useToast } from '@/hooks/use-toast';

// HomePage components
import ChatInterface from '@/components/homepage/ChatInterface';
import StepsSection from '@/components/StepsSection';
import FooterSection from '@/components/homepage/FooterSection';
import InfoBanner from '@/components/InfoBanner';
import { BrainCircuit, BarChart2, Sparkles } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';

// Dashboard components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BillSummaryHeader from './Dashboard/components/BillSummaryHeader';
import UserInfoHeader from './Dashboard/components/UserInfoHeader';
import OverviewTab from './Dashboard/components/OverviewTab';
import UsageTab from './Dashboard/components/UsageTab';
import SavingsTab from './Dashboard/components/SavingsTab';
import MetricCards from './Dashboard/components/MetricCards';
import { dashboardData as defaultDashboardData } from './Dashboard/data/dashboardData';
import { BillData } from '@/services/openai';
import { FileText } from 'lucide-react';

// Blog components
import { blogPosts } from './BlogPage/data/blogPosts';
import BlogHeader from './BlogPage/components/BlogHeader';
import BlogFilters from './BlogPage/components/BlogFilters';
import BlogGrid from './BlogPage/components/BlogGrid';
import BlogPagination from './BlogPage/components/BlogPagination';

// California components
import ServiceCards from '@/components/california/ServiceCards';
import UtilityTabs from '@/components/california/UtilityTabs';

// Solar components
import { Card } from '@/components/ui/card';
import SolarStepper from '@/components/solar/SolarStepper';
import SolarHowItWorks from '@/components/solar/SolarHowItWorks';
import SolarHomeSuitability from '@/components/solar/SolarHomeSuitability';
import SolarEconomics from '@/components/solar/SolarEconomics';
import SolarBatteryStorage from '@/components/solar/SolarBatteryStorage';
import SolarDecision from '@/components/solar/SolarDecision';
import SolarCompletionBadge from '@/components/solar/SolarCompletionBadge';
import { Info } from 'lucide-react';

// Contact components
import { ArrowRight, Search, Lightbulb, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SolarInfoNote from '@/components/solar/SolarInfoNote';

const POSTS_PER_PAGE = 6;

const SingleScrollPage = () => {
  const { language } = useContext(LanguageContext);
  const { toast } = useToast();
  const [isLoaded, setIsLoaded] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState('overview');
  const [analyzedBillData, setAnalyzedBillData] = useState<BillData | null>(null);

  // Blog state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // California state
  const [activeUtilityTab, setActiveUtilityTab] = useState('PG&E');

  // Solar state
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);

  // Video rotation state
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoUrls = [
    'https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/00energygrid.mp4',
    'https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/000solarhomes.mp4',
    'https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/0solarvid.mp4',
    'https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/00windmill.mp4'
  ];

  useEffect(() => {
    setIsLoaded(true);

    // Load analyzed bill data from sessionStorage
    const storedBillData = sessionStorage.getItem('billData');
    if (storedBillData) {
      try {
        setAnalyzedBillData(JSON.parse(storedBillData));
      } catch {
        console.error('Failed to parse bill data');
      }
    }
  }, []);

  // Video rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length);
    }, 12000); // Change video every 12 seconds

    return () => clearInterval(interval);
  }, [videoUrls.length]);

  const missionStatement = "We believe every homeowner deserves to understand their energy bill and make confident choices — without confusion, pressure, or gimmicks.";

  // Dashboard data
  const dashboardData = useMemo(() => {
    if (!analyzedBillData) return defaultDashboardData;

    const ratePerKwh = analyzedBillData.ratePerKwh
      ? `${(analyzedBillData.ratePerKwh * 100).toFixed(1)}¢`
      : defaultDashboardData.metrics[0].value;

    const billComponents = analyzedBillData.charges?.map((charge, index) => ({
      name: charge.name,
      amount: charge.amount,
      color: ['#007AFF', '#34C759', '#FF9500', '#AF52DE', '#FF2D55'][index % 5]
    })) || defaultDashboardData.bill.components;

    return {
      ...defaultDashboardData,
      utilityInfo: {
        provider: analyzedBillData.utilityCompany || defaultDashboardData.utilityInfo.provider,
        name: defaultDashboardData.utilityInfo.name,
      },
      billing: {
        month: analyzedBillData.billingPeriod || defaultDashboardData.billing.month,
        total: analyzedBillData.totalAmount || defaultDashboardData.billing.total,
      },
      metrics: [
        {
          id: 'rate',
          label: 'Current Rate',
          value: ratePerKwh,
          guessedValue: '12¢'
        },
        {
          id: 'usage',
          label: 'Monthly Usage',
          value: analyzedBillData.kwhUsage ? `${analyzedBillData.kwhUsage} kWh` : defaultDashboardData.metrics[1].value,
          comparison: 'Based on your actual bill'
        },
        defaultDashboardData.metrics[2]
      ],
      usage: {
        ...defaultDashboardData.usage,
        current: analyzedBillData.kwhUsage || defaultDashboardData.usage.current,
      },
      uploadDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      bill: {
        components: billComponents,
        total: analyzedBillData.totalAmount || billComponents.reduce((sum, c) => sum + c.amount, 0)
      }
    };
  }, [analyzedBillData]);

  // Blog filtering
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Solar progress
  const totalSteps = 5;
  const progress = Math.round((completedSteps.length / totalSteps) * 100);

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      const newCompletedSteps = [...completedSteps, step];
      setCompletedSteps(newCompletedSteps);

      if (newCompletedSteps.length === totalSteps) {
        toast({
          title: "Congratulations!",
          description: "You've earned the Solar Expert Badge!",
          duration: 3000,
        });
        setShowCompletionBadge(true);
      } else if (step < totalSteps) {
        setCurrentStep(step + 1);
      }
    }
  };

  const stepComponents = [
    <SolarHowItWorks key="step1" onComplete={() => handleStepComplete(1)} />,
    <SolarHomeSuitability key="step2" onComplete={() => handleStepComplete(2)} />,
    <SolarEconomics key="step3" onComplete={() => handleStepComplete(3)} />,
    <SolarBatteryStorage key="step4" onComplete={() => handleStepComplete(4)} />,
    <SolarDecision key="step5" onComplete={() => handleStepComplete(5)} progress={progress} />
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* HOME SECTION */}
      <section id="home" className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 relative overflow-hidden min-h-screen">
        {/* Video Background - Rotating with Crossfade */}
        <div className="absolute inset-0 w-full h-full z-0">
          {videoUrls.map((url, index) => (
            <video
              key={url}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-2000"
              style={{
                filter: 'none',
                imageRendering: 'high-quality',
                WebkitTransform: 'translateZ(0)',
                transform: 'translateZ(0)',
                opacity: currentVideoIndex === index ? 1 : 0,
                transitionDuration: '2000ms'
              }}
            >
              <source src={url} type="video/mp4" />
            </video>
          ))}
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <ChatInterface />
        </div>
      </section>

      {/* Mission Statement */}
      <motion.div
        className="max-w-3xl mx-auto px-4 mb-16"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={sectionVariants}
        transition={{ delay: 0.3 }}
      >
        <InfoBanner
          text={missionStatement}
          className="mx-auto"
        />
      </motion.div>

      {/* Features Cards Section */}
      <motion.section
        className="py-16 px-4 relative z-10"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={sectionVariants}
        transition={{ delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-white">
            How Our AI Works For You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="relative rounded-[1.25rem] p-2 md:rounded-[1.5rem] md:p-3"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
                variant="electric-blue"
              />
              <div className="relative h-full bg-black/40 backdrop-blur-sm border border-white/5 p-6 rounded-xl shadow-sm transition-all duration-300 hover:border-white/10">
                <div className="w-10 h-10 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center mb-6">
                  <BrainCircuit className="h-4 w-4 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white leading-tight tracking-tight">
                  Intelligent Analysis
                </h3>
                <p className="text-sm md:text-base text-white/50 leading-relaxed">
                  Our AI analyzes your bill line-by-line, identifying potential savings opportunities.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative rounded-[1.25rem] p-2 md:rounded-[1.5rem] md:p-3"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
                variant="electric-blue"
              />
              <div className="relative h-full bg-black/40 backdrop-blur-sm border border-white/5 p-6 rounded-xl shadow-sm transition-all duration-300 hover:border-white/10">
                <div className="w-10 h-10 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center mb-6">
                  <BarChart2 className="h-4 w-4 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white leading-tight tracking-tight">
                  Usage Insights
                </h3>
                <p className="text-sm md:text-base text-white/50 leading-relaxed">
                  Track patterns and get personalized recommendations for optimal energy consumption.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative rounded-[1.25rem] p-2 md:rounded-[1.5rem] md:p-3"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
                variant="electric-blue"
              />
              <div className="relative h-full bg-black/40 backdrop-blur-sm border border-white/5 p-6 rounded-xl shadow-sm transition-all duration-300 hover:border-white/10">
                <div className="w-10 h-10 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center mb-6">
                  <Sparkles className="h-4 w-4 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white leading-tight tracking-tight">
                  Smart Recommendations
                </h3>
                <p className="text-sm md:text-base text-white/50 leading-relaxed">
                  Get customized advice on choosing the right energy provider and plan for your home.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Steps Section */}
      <StepsSection />

      {/* DASHBOARD SECTION */}
      <section id="dashboard" className="py-16 px-4 bg-background/50">
        <div className="container max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">My Energy Dashboard</h1>
              <p className="text-muted-foreground mt-2">View and manage your energy usage and savings</p>

              {analyzedBillData ? (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Showing your actual bill data</span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  <FileText className="w-4 h-4" />
                  <span>Demo data - Upload your bill to see real analysis</span>
                </motion.div>
              )}
            </div>

            <UserInfoHeader
              name={dashboardData.userInfo.name}
              customerSince={dashboardData.userInfo.customerSince}
              utilityProvider={dashboardData.utilityInfo.provider}
              utilityName={dashboardData.utilityInfo.name}
              billingMonth={dashboardData.billing.month}
            />

            <BillSummaryHeader
              scoreValue={dashboardData.savingsScore}
              scoreLabel={dashboardData.savingsScoreLabel}
              uploadDate={dashboardData.uploadDate}
            />

            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="usage">Usage</TabsTrigger>
                <TabsTrigger value="savings">Savings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="space-y-6">
                  <MetricCards data={dashboardData.metrics} />
                  <OverviewTab data={dashboardData} />
                </div>
              </TabsContent>

              <TabsContent value="usage" className="mt-6">
                <UsageTab data={dashboardData.usage} />
              </TabsContent>

              <TabsContent value="savings" className="mt-6">
                <SavingsTab data={dashboardData.savings} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section id="blog" className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <BlogHeader />
          <BlogFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <BlogGrid posts={currentPosts} language={language} />
          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={setCurrentPage}
          />
        </div>
      </section>

      {/* CALIFORNIA SECTION */}
      <section id="california" className="py-16 px-4 bg-background/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">California Energy Providers</h1>
            <InfoBanner text={missionStatement} className="max-w-3xl mx-auto" />
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Information about California's three major utility companies and how to optimize your energy costs.
            </p>
          </div>

          <ServiceCards />
          <UtilityTabs
            activeTab={activeUtilityTab}
            setActiveTab={setActiveUtilityTab}
            handleUpload={() => toast({ title: "Upload your bill", description: "Select your energy bill to analyze and save.", duration: 3000 })}
          />
        </div>
      </section>

      {/* SOLAR SECTION */}
      <section id="solar" className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Solar Made Simple
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn about solar energy for California homes. Let's break down the myths and help you decide if solar is right for you — no pressure.
            </p>
          </div>

          <InfoBanner
            text="We believe every homeowner deserves to understand their energy bill and make confident choices — without confusion, pressure, or gimmicks."
            icon={<Info className="h-5 w-5" />}
          />

          <div className="w-full max-w-3xl mx-auto mb-8 mt-8">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-muted-foreground">Your Progress</span>
                <span className="text-sm font-medium text-primary">{progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            <Card className="p-6 shadow-dark-card border border-dark-border bg-dark-card mb-8">
              <SolarStepper
                currentStep={currentStep}
                completedSteps={completedSteps}
                onStepChange={setCurrentStep}
              />
            </Card>

            <Card className="p-6 shadow-dark-card border border-dark-border bg-dark-card">
              {stepComponents[currentStep - 1]}
            </Card>
          </div>

          <SolarCompletionBadge show={showCompletionBadge} />
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-16 px-4 bg-background/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
              Let's Talk — Your Energy Matters
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're here to educate, not pressure. Let's start with your bill.
            </p>
          </motion.div>

          <motion.div
            className="bg-dark-card border border-dark-border rounded-xl shadow-dark-card p-4 md:p-6 mb-8 md:mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Book Your Free Energy Bill Review
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
              A quick 15-minute call to help you understand your bill, spot savings, and see if solar is a good fit — no pressure, just clarity.
            </p>
            <div className="w-full h-[500px] md:h-[700px] overflow-hidden rounded-lg">
              <iframe
                src="https://calendly.com/rocky-teampaypro/energy-analysis"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule your energy analysis"
                className="w-full h-full"
              ></iframe>
            </div>
          </motion.div>

          <motion.div
            className="mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-dark-card border border-dark-border rounded-xl p-4 md:p-5 shadow-dark-card hover:shadow-dark-card-hover transition duration-300 ease-in-out">
                <div className="flex items-start space-x-3">
                  <Search className="w-5 h-5 md:w-6 md:h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">Why Understanding Your Bill Matters</h3>
                    <p className="text-sm md:text-base text-muted-foreground">Most homeowners are paying more than they need to. Understanding your bill helps you spot hidden charges, peak rates, and smart savings opportunities.</p>
                  </div>
                </div>
              </div>

              <div className="bg-dark-card border border-dark-border rounded-xl p-4 md:p-5 shadow-dark-card hover:shadow-dark-card-hover transition duration-300 ease-in-out">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">Not Everyone Needs Solar</h3>
                    <p className="text-sm md:text-base text-muted-foreground">We're not here to sell — we're here to help. Some homes qualify, some don't. Our job is to give you the facts so you can decide what's best.</p>
                  </div>
                </div>
              </div>

              <div className="bg-dark-card border border-dark-border rounded-xl p-4 md:p-5 shadow-dark-card hover:shadow-dark-card-hover transition duration-300 ease-in-out">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">We're Different</h3>
                    <p className="text-sm md:text-base text-muted-foreground">No pressure. No pitch. Just an honest breakdown of your energy options, backed by AI and real-world data.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mb-8 md:mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <SolarInfoNote variant="home">
              Our energy analysis is powered by AI that helps identify patterns in your energy usage and recommends personalized solutions for your specific situation.
            </SolarInfoNote>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default SingleScrollPage;
