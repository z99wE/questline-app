'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Navigation, Terminal as TerminalIcon } from 'lucide-react';
import XpBar from '@/components/ui/XpBar';
import QuestMap from '@/components/map/QuestMap';
import TacticalTerminal from '@/components/oracle/TacticalTerminal';
import PixelCard from '@/components/ui/PixelCard';
import PixelButton from '@/components/ui/PixelButton';

/**
 * HeroDashboard Component - PIVOT UPGRADE
 * The main command center for QuestLine logistics.
 * Exclusively powered by Google Maps Intelligence.
 */
export default function HeroDashboard() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showReward, setShowReward] = useState(false);
  const [rewardMsg, setRewardMsg] = useState('');
  const [tacticalLogs, setTacticalLogs] = useState<string[]>([]);
  const [intel, setIntel] = useState({ flow: 'OPTIMAL', density: 64, exit: 'GATE 7' });

  // Initial load effect
  useEffect(() => {
    const init = () => {
      try {
        const savedXp = localStorage.getItem('questline_xp');
        const savedLevel = localStorage.getItem('questline_level');
        if (savedXp) setXp(Number(savedXp));
        if (savedLevel) setLevel(Number(savedLevel));
        
        setTacticalLogs([
           "SYSTEM INITIALIZED. COMMANDER LOGGED IN.",
           "MAP_UPLINK STABLE. SECTOR NY_D1 ACCESSIBLE.",
           "ADVICE: SECURE HUB ALPHA TO ESTABLISH PERIMETER."
        ]);
      } catch (e) {
        console.error("Failed to load persistence:", e);
      } finally {
        setLoading(false);
      }
    };
    
    init();

    // Living World: Random Intel Fluctuations
    const intelInterval = setInterval(() => {
      setIntel(prev => ({
        ...prev,
        density: Math.min(100, Math.max(0, prev.density + (Math.random() > 0.5 ? 1 : -1)))
      }));
    }, 8000);

    return () => clearInterval(intelInterval);
  }, []);

  // Save state to local storage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('questline_xp', xp.toString());
      localStorage.setItem('questline_level', level.toString());
    }
  }, [xp, level, loading]);

  const addLog = (msg: string) => {
    setTacticalLogs(prev => [...prev.slice(-15), msg]);
  };

  const triggerNotify = (msg: string) => {
    setRewardMsg(msg);
    setShowReward(true);
    addLog(msg);
    setTimeout(() => setShowReward(false), 3000);
  };

  const gainXp = (amount: number) => {
    setXp(prev => {
      const newXp = prev + amount;
      if (newXp >= 1000) {
        setLevel(l => l + 1);
        addLog(`COMMANDER PROMOTED TO LEVEL ${level + 1}!`);
        return newXp - 1000;
      }
      return newXp;
    });
  };

  const handleHubSecured = (name: string, xpAmount: number) => {
    triggerNotify(`${name} SECURED! +${xpAmount} XP GAINED`);
    gainXp(xpAmount);
    
    // Add tactical context based on Hub
    if (name.includes("ALPHA")) {
      setTimeout(() => addLog("INTEL: CENTRAL HUB FLOW STABILIZED via LINE 4."), 1500);
    } else if (name.includes("BRAVO")) {
      setTimeout(() => addLog("INTEL: RED ZONE DENSITY DECREASING. SECURE ECHO NEXT."), 1500);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center font-mono p-8 text-center">
        <TerminalIcon className="w-12 h-12 mb-4 animate-bounce" />
        <h1 className="text-xl mb-2 font-bold tracking-tighter">SECURE_COMM_CHANNEL_ESTABLISHED...</h1>
        <div className="w-64 h-4 border-4 border-black relative overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-quest-blue"
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto relative overflow-hidden bg-white selection:bg-quest-blue selection:text-white">
      <AnimatePresence>
        {showReward && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            role="status"
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-quest-yellow border-4 border-black p-4 text-black font-mono shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center min-w-[280px] font-bold"
          >
            {rewardMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Area */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 border-b-4 border-black pb-4 font-mono">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2 tracking-tighter">
            <Shield className="w-8 h-8 text-quest-blue" />
            QUESTLINE::TACTICAL
          </h1>
          <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-bold">STATIONARY_COMMAND_CENTER // REV.09</p>
        </div>
        
        <div className="w-full md:w-80">
          <XpBar currentXp={xp} maxXp={1000} level={level} />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Tactical Map */}
        <div className="lg:col-span-8 flex flex-col">
          <QuestMap onHubSecured={handleHubSecured} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PixelCard title="LOGISTICS_INTEL">
              <div className="space-y-4 text-[11px] font-mono" role="region">
                <div className="flex justify-between items-center border-b border-black/10 pb-1">
                  <span className="font-bold">TRANSIT_FLOW:</span>
                  <span className="text-quest-green font-bold">{intel.flow}</span>
                </div>
                <div className="flex justify-between items-center border-b border-black/10 pb-1">
                  <span className="font-bold">HUB_DENSITY:</span>
                  <span className="text-quest-yellow font-bold">{intel.density}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">PRIMARY_HUB:</span>
                  <span className="font-bold">NYCENTRAL_ALPHA</span>
                </div>
              </div>
            </PixelCard>

            <PixelCard title="COMMAND_OVERRIDE" variant="quest">
              <div className="flex flex-col gap-3">
                <PixelButton 
                  variant="outline" 
                  className="w-full text-left" 
                  size="sm"
                  onClick={() => handleHubSecured('REMOTE_SECTOR_7', 20)}
                >
                  &gt; SCAN_REMOTE_LOCATION
                </PixelButton>
                <PixelButton 
                  variant="outline" 
                  className="w-full text-left" 
                  size="sm"
                  onClick={() => triggerNotify('STATUS: STEWARDS REDIRECTED TO PORT ECHO')}
                >
                  &gt; REDIR_STEWARD_UNITS
                </PixelButton>
              </div>
            </PixelCard>
          </div>
        </div>

        {/* Right Column: Mission Terminal */}
        <div className="lg:col-span-4 flex flex-col">
          <TacticalTerminal logs={tacticalLogs} />
          
          <PixelCard className="mt-6 border-dashed" title="MISSION_BRIEF">
            <div className="text-[10px] leading-relaxed font-mono">
              <p className="mb-2">1. USE THE <span className="font-bold underline">TACTICAL_MAP</span> TO LOCATE ALPHA, BRAVO, OR ECHO HUBS.</p>
              <p className="mb-2">2. <span className="font-bold underline">CLICK HUBS</span> TO SECURE THE SECTOR AND SECURE INTEL XP.</p>
              <p>3. REACH LEVEL 5 TO UNLOCK REGIONAL OVERWATCH.</p>
            </div>
          </PixelCard>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-[10px] text-gray-400 font-mono border-t-4 border-black pt-6">
        LOGISTICS_UPLINK: <span className="text-quest-green font-bold">VERIFIED</span> | ENCRYPTION: <span className="text-quest-blue font-bold">STABLE</span>
        <div className="mt-2">&copy; 2026 QUESTLINE TACTICAL SOLUTIONS</div>
      </footer>
    </main>
  );
}
