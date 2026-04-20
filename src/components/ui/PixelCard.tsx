import React from 'react';
import { cn } from '@/lib/utils';

interface PixelCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  variant?: 'default' | 'oracle' | 'quest';
}

/**
 * PixelCard Component
 * A modular card component with a pixel-art shadow and header.
 * @param title - Header text
 * @param variant - Visual style (default, quest, oracle)
 */
const PixelCard: React.FC<PixelCardProps> = ({ 
  children, 
  className, 
  title,
  variant = 'default' 
}) => {
  const variants = {
    default: 'border-black bg-white',
    oracle: 'border-quest-blue bg-blue-50',
    quest: 'border-quest-yellow bg-yellow-50',
  };

  return (
    <div className={cn(
      'pixel-border relative p-4 mb-4',
      variants[variant],
      className
    )}>
      {title && (
        <div className="absolute -top-4 left-4 bg-black text-white px-3 py-1 text-[8px] uppercase tracking-tighter">
          {title}
        </div>
      )}
      {children}
    </div>
  );
};

export default PixelCard;
