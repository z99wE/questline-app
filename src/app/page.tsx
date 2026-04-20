'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Zap, Shield, Navigation, Terminal } from 'lucide-react';
import XpBar from '@/components/ui/XpBar';
import QuestMap from '@/components/map/QuestMap';
import OracleChat from '@/components/oracle/OracleChat';
import PixelCard from '@/components/ui/PixelCard';
import PixelButton from '@/components/ui/PixelButton';

/**
 * HeroDashboard Component
 * The main command center for QuestLine logistics.
 * Handles user progression (XP/Level), mission briefing, map visualization, and AI chat.
 */
export default function HeroDashboard() {
  // Initialize state with default values or from localStorage if available
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showReward, setShowReward] = useState(false);
  const [rewardMsg, setRewardMsg] = useState('');
  const [missionLogs, setMissionLogs] = useState<string[]>([]);
  const [intel, setIntel] = useState({ flow: 'OPTIMAL', density: 64, exit: 'GATE 7' });
  const feedEndRef = useRef<HTMLDivElement>(null);

  // Initial load effect
  useEffect(() => {
    const init = () => {
      try {
        const savedXp = localStorage.getItem('questline_xp');
        const savedLevel = localStorage.getItem('questline_level');
        if (savedXp) setXp(Number(savedXp));
        if (savedLevel) setLevel(Number(savedLevel));
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
    }, 5000);

    // Living World: Random Mission Events
    const events = [
      "SAT_SCAN: MINOR CONGESTION AT NORTH EXIT",
      "INTEL: COMMUTER SPIKE DETECTED IN ZONE B",
      "STATUS: METRO LINE 4 RUNNING AT 110% CAPACITY",
      "ALERT: STEWARD UNIT 04 READY FOR DEPLOYMENT",
      "SCAN: HUB VISIBILITY - CLEAR"
    ];

    const eventInterval = setInterval(() => {
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      setMissionLogs(prev => [...prev.slice(-4), `[${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}] ${randomEvent}`]);
    }, 12000);

    return () => {
      clearInterval(intelInterval);
      clearInterval(eventInterval);
    };
  }, []);

  // Save state to local storage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('questline_xp', xp.toString());
      localStorage.setItem('questline_level', level.toString());
    }
  }, [xp, level, loading]);

  const triggerNotify = (msg: string) => {
    setRewardMsg(msg);
    setShowReward(true);
    setMissionLogs(prev => [...prev.slice(-4), `[${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}] ${msg}`]);
    setTimeout(() => setShowReward(false), 3000);
  };

  const gainXp = (amount: number) => {
    setXp(prev => {
      const newXp = prev + amount;
      if (newXp >= 1000) {
        setLevel(l => l + 1);
        return newXp - 1000;
      }
      return newXp;
    });
    triggerNotify(`QUEST COMPLETE! +${amount} XP GAINED`);
  };

  // Auto-scroll feed
  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [missionLogs]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center font-pixel p-8 text-center">
        <Terminal className="w-12 h-12 mb-4 animate-bounce" />
        <h1 className="text-xl mb-2">INITIALIZING QUESTLINE...</h1>
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
    <main className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto relative overflow-hidden">
      <AnimatePresence>
        {showReward && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            role="status"
            aria-live="polite"
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-quest-yellow border-4 border-black p-4 text-black font-pixel shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center min-w-[200px]"
          >
            {rewardMsg}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Header Area */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b-4 border-black pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-pixel flex items-center gap-2">
            <Shield className="w-8 h-8 text-quest-blue" aria-hidden="true" />
            QUESTLINE
          </h1>
          <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">Crowd Commander v1.0.4</p>
        </div>
        
        <div className="w-full md:w-80" aria-label="Experience points and level summary" role="group">
          <XpBar currentXp={xp} maxXp={1000} level={level} />
        </div>
      </header>

      {/* Onboarding / About Section */}
      <section aria-labelledby="mission-briefing-title">
        <PixelCard title="MISSION BRIEFING" variant="oracle" className="mb-8 border-dashed">
          <h2 id="mission-briefing-title" className="sr-only">Mission Briefing</h2>
          <p className="text-[10px] leading-relaxed">
            Welcome, Commander. **QuestLine** is a logistics management hub. 
            Use the **Quest Map** to monitor hubs, and consult **The Oracle (AI)** for tactical advice. 
            Claim **Quests** by efficiently managing crowd flow to earn XP and level up.
          </p>
        </PixelCard>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Map & Logistics */}
        <div className="lg:col-span-8" role="region" aria-label="Map and Active Tasks">
          <QuestMap />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PixelCard title="MAIN QUESTS" variant="quest">
              <ul className="space-y-4 text-[10px]" role="list">
                <li className="flex items-start gap-2 border-b border-gray-200 pb-2">
                  <Zap className="w-4 h-4 text-quest-yellow shrink-0" aria-hidden="true" />
                  <span>Reach **CENTRAL HUB** via Metro Line 4 for <span className="text-quest-green">+50 XP</span> reward.</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-quest-red shrink-0" aria-hidden="true" />
                  <span>Evacuate **ZONE B** - High crowd density detected.</span>
                </li>
              </ul>
              <PixelButton 
                className="mt-4 w-full" 
                size="sm" 
                onClick={() => gainXp(50)}
                aria-label="Claim +50 XP reward for Central Hub reached"
              >
                CLAIM REWARD
              </PixelButton>
            </PixelCard>

            <PixelCard title="LOGISTICS INTEL">
              <div className="space-y-3 text-[10px]" role="region" aria-label="Real-time transit statistics">
                <div className="flex justify-between items-center">
                  <span>TRANSIT FLOW:</span>
                  <span className="text-quest-green" aria-label={`Flow status: ${intel.flow}`}>{intel.flow}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>HUB OCCUPANCY:</span>
                  <span className="text-quest-yellow" aria-label={`Occupancy: ${intel.density} percent`}>{intel.density}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>NEAREST EXIT:</span>
                  <span aria-label={`Nearest exit is ${intel.exit}`}>GATE 7 (240m)</span>
                </div>
              </div>
            </PixelCard>

            <PixelCard title="LIVE OPS FEED">
              <div className="space-y-2 text-[8px] font-mono h-24 overflow-y-auto scrollbar-hide">
                {missionLogs.length === 0 ? (
                  <div className="text-gray-400 italic">WAITING FOR SYSTEM PING...</div>
                ) : (
                  <>
                    {missionLogs.map((log, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="border-l-2 border-quest-blue pl-2"
                      >
                        {log}
                      </motion.div>
                    ))}
                    <div ref={feedEndRef} />
                  </>
                )}
              </div>
            </PixelCard>
          </div>
        </div>

        {/* Right Column: AI Assistant & Comms */}
        <div className="lg:col-span-4" role="region" aria-label="Control Center">
          <OracleChat />
          
          <PixelCard className="mt-4" title="STATUS COMMAND">
            <div className="flex flex-col gap-2">
              <PixelButton 
                variant="outline" 
                className="w-full text-left active:scale-95 transition-transform" 
                size="sm"
                onClick={() => triggerNotify('ALERT BROADCASTED TO ALL SECTORS!')}
                aria-label="Broadcast alert to all sectors"
              >
                <Navigation className="w-4 h-4 mr-2" aria-hidden="true" /> BROADCAST ALERT
              </PixelButton>
              <PixelButton 
                variant="outline" 
                className="w-full text-left active:scale-95 transition-transform" 
                size="sm"
                onClick={() => triggerNotify('STEWARDS DEPLOYED TO HOTZONES!')}
                aria-label="Deploy stewards to hotzones"
              >
                <Shield className="w-4 h-4 mr-2" aria-hidden="true" /> DEPLOY STEWARDS
              </PixelButton>
            </div>
          </PixelCard>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-[8px] text-gray-400 uppercase tracking-widest border-t-4 border-black pt-4">
        &copy; 2026 QUESTLINE LOGISTICS | SYSTEM STATUS: <span className="text-quest-green">ONLINE</span>
      </footer>
    </main>
  );
}
