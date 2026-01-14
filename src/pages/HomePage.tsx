
import React, { useState, useEffect } from 'react';
import { BrainCircuit, BarChart2, Sparkles } from 'lucide-react';
import StepsSection from '@/components/StepsSection';
import FooterSection from '@/components/homepage/FooterSection';
import InfoBanner from '@/components/InfoBanner';
import { motion } from 'framer-motion';
import WalkthroughModal from '@/components/homepage/WalkthroughModal';
import ChatInterface from '@/components/homepage/ChatInterface';
import { GlowingEffect } from '@/components/ui/glowing-effect';

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [walkthrough, setWalkthrough] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const missionStatement = "We believe every homeowner deserves to understand their energy bill and make confident choices — without confusion, pressure, or gimmicks.";

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
      {/* Hero Section with Chat Interface */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 relative z-10">
        <ChatInterface />
      </section>
      
      {/* Walkthrough Modal */}
      <WalkthroughModal open={walkthrough} onOpenChange={setWalkthrough} />
      
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
      
      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default HomePage;
