
import React, { useEffect, useState } from 'react';

interface EnergyScoreCircleProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

const EnergyScoreCircle: React.FC<EnergyScoreCircleProps> = ({
  score,
  size = 90,
  strokeWidth = 8,
  label = "Good"
}) => {
  const [offset, setOffset] = useState(283);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    const progressOffset = ((100 - score) / 100) * circumference;
    const timer = setTimeout(() => {
      setOffset(progressOffset);
    }, 100);

    return () => clearTimeout(timer);
  }, [score, circumference]);

  const getScoreColor = () => {
    if (score >= 80) return '#34C759'; // Apple Green - Excellent
    if (score >= 60) return '#007AFF'; // Apple Blue - Good
    if (score >= 40) return '#FFD60A'; // Apple Gold - Fair
    return '#FF3B30'; // Apple Red - Poor
  };

  const getScoreGlow = () => {
    if (score >= 80) return 'drop-shadow(0 0 8px rgba(52, 199, 89, 0.4))';
    if (score >= 60) return 'drop-shadow(0 0 8px rgba(0, 122, 255, 0.4))';
    if (score >= 40) return 'drop-shadow(0 0 8px rgba(255, 214, 10, 0.4))';
    return 'drop-shadow(0 0 8px rgba(255, 59, 48, 0.4))';
  };

  return (
    <div className="score-circle relative" style={{ width: size, height: size }}>
      <svg
        className="progress-ring"
        width={size}
        height={size}
        style={{ filter: getScoreGlow() }}
      >
        {/* Background circle */}
        <circle
          stroke="#F5F5F7"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          stroke={getScoreColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transition: 'stroke-dashoffset 1s ease-in-out',
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%'
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-foreground">{score}</span>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
    </div>
  );
};

export default EnergyScoreCircle;
