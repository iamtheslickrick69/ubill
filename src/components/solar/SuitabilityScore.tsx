
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star } from 'lucide-react';

interface SuitabilityScoreProps {
  score: number;
}

const SuitabilityScore: React.FC<SuitabilityScoreProps> = ({ score }) => {
  const getScoreColor = () => {
    if (score >= 80) return '#34C759';
    if (score >= 60) return '#007AFF';
    if (score >= 40) return '#FFD60A';
    return '#FF3B30';
  };

  const getScoreGradient = () => {
    if (score >= 80) return 'from-accent to-green-400';
    if (score >= 60) return 'from-primary to-blue-400';
    if (score >= 40) return 'from-game-gold to-game-orange';
    return 'from-destructive to-red-400';
  };

  const getScoreLabel = () => {
    if (score >= 80) return { text: 'Excellent!', emoji: '🏆' };
    if (score >= 60) return { text: 'Good!', emoji: '⭐' };
    if (score >= 40) return { text: 'Fair', emoji: '👍' };
    return { text: 'Needs Work', emoji: '💪' };
  };

  const label = getScoreLabel();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card p-6 rounded-2xl shadow-apple-md border border-border/50 text-center"
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-game-gold" />
        <h3 className="text-lg font-semibold text-foreground">Solar Suitability Score</h3>
      </div>

      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {/* Background circle */}
          <circle
            cx="50" cy="50" r="42"
            fill="none"
            stroke="#F5F5F7"
            strokeWidth="12"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50" cy="50" r="42"
            fill="none"
            stroke={getScoreColor()}
            strokeWidth="12"
            strokeDasharray="264"
            strokeDashoffset={264 - (264 * score / 100)}
            strokeLinecap="round"
            initial={{ strokeDashoffset: 264 }}
            animate={{ strokeDashoffset: 264 - (264 * score / 100) }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 10px ${getScoreColor()}40)`
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-bold text-foreground"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-muted-foreground">out of 100</span>
        </div>
      </div>

      {/* Result Badge */}
      <motion.div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${getScoreGradient()} text-white font-medium shadow-apple`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <span>{label.emoji}</span>
        <span>{label.text}</span>
      </motion.div>

      {/* XP Earned */}
      <motion.p
        className="text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Star className="w-3 h-3 text-game-gold fill-game-gold" />
        <span>+50 XP for completing your solar assessment!</span>
      </motion.p>
    </motion.div>
  );
};

export default SuitabilityScore;
