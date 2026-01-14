
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Lightbulb, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import SolarInfoNote from '@/components/solar/SolarInfoNote';

const ContactPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 mt-16 md:mt-0 bg-gradient-dark min-h-screen">
      {/* Page Header */}
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

      {/* Calendly Widget */}
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

      {/* Educational Cards */}
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

      {/* Additional Info */}
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

      {/* CTA Button */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Button 
          className="px-6 py-5 md:px-8 md:py-6 text-base md:text-lg flex items-center gap-2"
          onClick={() => navigate('/bill-analysis')}
        >
          See How Our AI Works <ArrowRight className="ml-1" />
        </Button>
      </motion.div>
    </div>
  );
};

export default ContactPage;
