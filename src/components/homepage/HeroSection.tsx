
import React, { useContext, useState } from 'react';
import { Zap, Trophy, Star, Sparkles, ChevronRight, Shield, Brain, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LanguageContext } from '@/App';
import { translations } from '@/utils/translations';
import WalkthroughModal from './WalkthroughModal';
import UploadBillButton from '@/components/UploadBillButton';
import { useGamification } from '@/context/GamificationContext';

interface HeroSectionProps {
  isLoaded: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isLoaded }) => {
  const { language } = useContext(LanguageContext);
  const [walkthrough, setWalkthrough] = useState(false);
  const { xp, level, xpToNextLevel } = useGamification();
  const xpInCurrentLevel = xp % xpToNextLevel;

  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "100% Free",
      description: "No hidden fees, ever",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered",
      description: "Smart bill analysis",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Personalized",
      description: "Tailored recommendations",
      color: "text-game-purple",
      bgColor: "bg-game-purple/10"
    }
  ];

  return (
    <section className="pt-28 pb-8 md:pt-32 md:pb-12 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Gamification Header - XP & Level */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-3 bg-secondary/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-game-gold fill-game-gold" />
              <span className="text-sm font-medium text-foreground">Level {level}</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-game-purple" />
              <span className="text-sm text-muted-foreground">{xpInCurrentLevel} / {xpToNextLevel} XP</span>
            </div>
          </div>
        </motion.div>

        <div className="text-center">
          <motion.div
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={heroVariants}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <Zap className="w-4 h-4" />
              <span>AI-Powered Energy Analysis</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-[1.1] tracking-tight">
              Understand your
              <br />
              <span className="text-gradient-apple">energy bill</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Upload your bill, earn XP, and unlock savings insights.
              <br className="hidden md:block" />
              It's free, smart, and actually fun.
            </p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
              variants={heroVariants}
            >
              <UploadBillButton
                className="w-full sm:w-auto"
                size="lg"
                variant="default"
              >
                <span className="flex items-center gap-2">
                  Get Started Free
                  <ChevronRight className="w-4 h-4" />
                </span>
              </UploadBillButton>

              <Button
                onClick={() => setWalkthrough(true)}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                See How It Works
              </Button>
            </motion.div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariant}
                className="group relative bg-card p-5 rounded-2xl shadow-apple hover:shadow-apple-md border border-border/50 transition-all duration-300"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className={`${feature.bgColor} ${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-game-gold" />
              <span className="text-sm">10,000+ bills analyzed</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-game-gold fill-game-gold" />
              <span className="text-sm">4.9/5 user rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-sm">Bank-level security</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Walkthrough Modal */}
      <WalkthroughModal open={walkthrough} onOpenChange={setWalkthrough} />
    </section>
  );
};

export default HeroSection;
