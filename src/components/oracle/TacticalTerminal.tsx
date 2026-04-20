'use client';

import React, { useEffect, useRef } from 'react';
import PixelCard from '../ui/PixelCard';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * TacticalTerminal Component
 * Provides automated mission logs and tactical updates.
 * Replaces the AI chat with a high-reliability rule-based messaging system.
 */
interface TacticalTerminalProps {
  logs: string[];
}

const TacticalTerminal = ({ logs }: TacticalTerminalProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest tactical intel
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <PixelCard title="TACTICAL_TERMINAL" variant="oracle" className="min-h-[350px] flex flex-col font-mono">
      <div className="bg-black/5 p-2 mb-2 border border-black/20 text-[8px] flex justify-between items-center">
        <span>ENCRYPTION: AES-256</span>
        <span className="animate-pulse">● LIVE_FEED</span>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto mb-2 space-y-2 max-h-[240px] px-2 scrollbar-hide py-2"
      >
        <AnimatePresence initial={false}>
          {logs.map((log, i) => (
            <motion.div
              key={`${i}-${log}`}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[10px] leading-tight border-l-2 border-black pl-2 py-1 bg-white/50"
            >
              <span className="text-gray-400 mr-2">[{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
              <span className="font-bold">{log}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {logs.length === 0 && (
          <div className="text-[10px] italic text-gray-400 animate-pulse">
            INITIATING SCAN... WAITING FOR HUB PING...
          </div>
        )}
      </div>
      
      <div className="mt-auto border-t-2 border-black pt-2 bg-quest-green/10 p-2">
        <div className="text-[9px] font-bold uppercase tracking-tighter">
          STATUS: MISSION_READY
        </div>
        <div className="w-full bg-black/20 h-1 mt-1 overflow-hidden">
          <motion.div 
            className="bg-quest-green h-full"
            animate={{ width: ["0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </PixelCard>
  );
};

export default TacticalTerminal;
