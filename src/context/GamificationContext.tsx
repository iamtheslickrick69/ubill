import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface GamificationState {
  xp: number;
  level: number;
  totalQuestions: number;
  billsAnalyzed: number;
  solarAssessmentsCompleted: number;
  achievements: string[];
}

interface GamificationContextType extends GamificationState {
  addXP: (amount: number, reason?: string) => void;
  unlockAchievement: (achievementId: string) => void;
  incrementQuestions: () => void;
  incrementBillsAnalyzed: () => void;
  incrementSolarAssessments: () => void;
  xpToNextLevel: number;
  xpProgress: number;
}

const STORAGE_KEY = 'ubill_gamification';

const XP_PER_LEVEL = 100;

const defaultState: GamificationState = {
  xp: 0,
  level: 1,
  totalQuestions: 0,
  billsAnalyzed: 0,
  solarAssessmentsCompleted: 0,
  achievements: [],
};

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GamificationState>(() => {
    if (typeof window === 'undefined') return defaultState;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultState;
      }
    }
    return defaultState;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const calculateLevel = (xp: number): number => {
    return Math.floor(xp / XP_PER_LEVEL) + 1;
  };

  const addXP = useCallback((amount: number, reason?: string) => {
    setState((prev) => {
      const newXP = prev.xp + amount;
      const newLevel = calculateLevel(newXP);
      const leveledUp = newLevel > prev.level;

      if (leveledUp) {
        // Could trigger a celebration here
        console.log(`Level up! Now level ${newLevel}`);
      }

      if (reason) {
        console.log(`+${amount} XP: ${reason}`);
      }

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
      };
    });
  }, []);

  const unlockAchievement = useCallback((achievementId: string) => {
    setState((prev) => {
      if (prev.achievements.includes(achievementId)) return prev;
      return {
        ...prev,
        achievements: [...prev.achievements, achievementId],
      };
    });
  }, []);

  const incrementQuestions = useCallback(() => {
    setState((prev) => ({
      ...prev,
      totalQuestions: prev.totalQuestions + 1,
    }));
  }, []);

  const incrementBillsAnalyzed = useCallback(() => {
    setState((prev) => ({
      ...prev,
      billsAnalyzed: prev.billsAnalyzed + 1,
    }));
  }, []);

  const incrementSolarAssessments = useCallback(() => {
    setState((prev) => ({
      ...prev,
      solarAssessmentsCompleted: prev.solarAssessmentsCompleted + 1,
    }));
  }, []);

  const xpToNextLevel = XP_PER_LEVEL;
  const xpProgress = (state.xp % XP_PER_LEVEL) / XP_PER_LEVEL * 100;

  return (
    <GamificationContext.Provider
      value={{
        ...state,
        addXP,
        unlockAchievement,
        incrementQuestions,
        incrementBillsAnalyzed,
        incrementSolarAssessments,
        xpToNextLevel,
        xpProgress,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = (): GamificationContextType => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

export default GamificationContext;
