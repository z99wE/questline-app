import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface PixelButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

/**
 * PixelButton Component
 * A retro 8-bit styled button with framer-motion tap effects.
 * @param variant - Visual style (primary, success, warning, danger, outline)
 * @param size - Button size (sm, md, lg)
 * @param children - Button content
 */
const PixelButton: React.FC<PixelButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md',
  ...props 
}) => {
  const variants = {
    primary: 'bg-quest-blue hover:bg-blue-600',
    success: 'bg-quest-green hover:bg-green-600',
    warning: 'bg-quest-yellow hover:bg-yellow-600 text-black',
    danger: 'bg-quest-red hover:bg-red-600',
    outline: 'bg-white text-black border-black hover:bg-gray-100',
  };

  const sizes = {
    sm: 'px-2 py-1 text-[8px]',
    md: 'px-4 py-2 text-[10px]',
    lg: 'px-6 py-3 text-[12px]',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95, x: 2, y: 2 }}
      className={cn(
        'pixel-button relative inline-flex items-center justify-center font-pixel uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default PixelButton;
