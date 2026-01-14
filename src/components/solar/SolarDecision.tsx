
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertTriangle, ThumbsUp, ThumbsDown, Calendar, User, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SolarDecisionProps {
  onComplete: () => void;
  progress: number;
}

const SolarDecision: React.FC<SolarDecisionProps> = ({ onComplete, progress }) => {
  const [decision, setDecision] = useState<'yes' | 'no' | 'maybe' | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleComplete = () => {
    // If they chose yes or maybe and didn't fill the form, show a toast
    if ((decision === 'yes' || decision === 'maybe') && 
        (!formData.name || !formData.email)) {
      toast({
        title: "Please fill out the required fields",
        description: "We need your name and email to schedule a consultation.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (decision === 'yes' || decision === 'maybe') {
      toast({
        title: "Consultation Request Received!",
        description: "A solar expert will contact you soon to discuss your options.",
        duration: 3000,
      });
    } else if (decision === 'no') {
      toast({
        title: "Thank you for your feedback",
        description: "We appreciate you taking the time to learn about solar energy.",
        duration: 3000,
      });
    }

    setIsCompleted(true);
    onComplete();
  };

  // Calculate the recommendation based on progress
  const getRecommendation = () => {
    if (progress >= 80) {
      return {
        verdict: 'Highly Recommended',
        icon: <ThumbsUp className="w-6 h-6 text-green-600" />,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        message: 'Based on your responses, solar energy appears to be an excellent fit for your home and energy needs.'
      };
    } else if (progress >= 60) {
      return {
        verdict: 'Recommended',
        icon: <ThumbsUp className="w-6 h-6 text-blue-600" />,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        message: 'Solar energy looks like a good option for you, though there are some factors to consider.'
      };
    } else if (progress >= 40) {
      return {
        verdict: 'Consider Carefully',
        icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        message: 'Solar may work for you, but there are some challenges to overcome. A consultation would be helpful.'
      };
    } else {
      return {
        verdict: 'Not Recommended',
        icon: <ThumbsDown className="w-6 h-6 text-red-600" />,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        message: 'Based on your inputs, solar may not be the best option for your current situation.'
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Making Your Decision</h2>
        <p className="text-gray-600 mt-2">Based on your answers, here's what we recommend.</p>
      </div>

      <div className={`${recommendation.bgColor} p-6 rounded-lg`}>
        <div className="flex items-center mb-4">
          <div className="mr-3">
            {recommendation.icon}
          </div>
          <h3 className={`text-xl font-bold ${recommendation.color}`}>
            {recommendation.verdict}
          </h3>
        </div>
        <p className="text-gray-700">
          {recommendation.message}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold mb-6">Ready to make a decision?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-lg border-2 flex flex-col items-center justify-center space-y-3 transition-all ${
              decision === 'yes' 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:border-green-300 hover:bg-green-50/30'
            }`}
            onClick={() => setDecision('yes')}
          >
            <CheckCircle className={`w-12 h-12 ${decision === 'yes' ? 'text-green-500' : 'text-gray-400'}`} />
            <span className={`font-medium ${decision === 'yes' ? 'text-green-700' : 'text-gray-600'}`}>
              Yes, I'm interested
            </span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-lg border-2 flex flex-col items-center justify-center space-y-3 transition-all ${
              decision === 'maybe' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/30'
            }`}
            onClick={() => setDecision('maybe')}
          >
            <AlertTriangle className={`w-12 h-12 ${decision === 'maybe' ? 'text-blue-500' : 'text-gray-400'}`} />
            <span className={`font-medium ${decision === 'maybe' ? 'text-blue-700' : 'text-gray-600'}`}>
              Maybe, I need more info
            </span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-lg border-2 flex flex-col items-center justify-center space-y-3 transition-all ${
              decision === 'no' 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-200 hover:border-red-300 hover:bg-red-50/30'
            }`}
            onClick={() => setDecision('no')}
          >
            <XCircle className={`w-12 h-12 ${decision === 'no' ? 'text-red-500' : 'text-gray-400'}`} />
            <span className={`font-medium ${decision === 'no' ? 'text-red-700' : 'text-gray-600'}`}>
              No, not for me right now
            </span>
          </motion.button>
        </div>
        
        {(decision === 'yes' || decision === 'maybe') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <h4 className="text-lg font-medium mb-4">Schedule Your Free Consultation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-energy-blue focus:outline-none focus:ring-1 focus:ring-energy-blue"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">@</span>
                  </div>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-energy-blue focus:outline-none focus:ring-1 focus:ring-energy-blue"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">#</span>
                  </div>
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Your phone number"
                    className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-energy-blue focus:outline-none focus:ring-1 focus:ring-energy-blue"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date (optional)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <input 
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-energy-blue focus:outline-none focus:ring-1 focus:ring-energy-blue"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-500 flex items-start">
              <FileText className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <p>We respect your privacy. Your information will only be used to schedule your consultation and will not be shared with third parties.</p>
            </div>
          </motion.div>
        )}
        
        {decision === 'no' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 p-4 rounded-lg mt-6"
          >
            <p className="text-gray-700">
              Thank you for your interest in solar energy. If your circumstances change or you'd like to revisit this in the future, we're here to help. Feel free to return to this tool anytime.
            </p>
          </motion.div>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <Button 
          onClick={handleComplete}
          disabled={!decision || isCompleted}
          className={`px-8 ${isCompleted ? 'bg-green-500' : 'bg-energy-blue'}`}
        >
          {isCompleted ? 'Completed!' : 'Submit My Decision'}
        </Button>
      </div>
    </div>
  );
};

export default SolarDecision;
