import React from 'react';
import { motion } from 'framer-motion';

interface XpBarProps {
  currentXp: number;
  maxXp: number;
  level: number;
}

/**
 * XpBar Component
 * A gamified progress bar showing user level and experience points.
 * @param currentXp - Current XP value
 * @param maxXp - Maximum XP for current level
 * @param level - Current user level
 */
const XpBar: React.FC<XpBarProps> = ({ currentXp, maxXp, level }) => {
  const percentage = Math.min((currentXp / maxXp) * 100, 100);

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-end mb-2">
        <div className="bg-black text-white px-2 py-1 text-[10px] uppercase">
          LVL {level}
        </div>
        <div className="text-[10px] text-black">
          XP: {currentXp} / {maxXp}
        </div>
      </div>
      <div className="xp-container overflow-hidden">
        <motion.div 
          className="xp-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default XpBar;
