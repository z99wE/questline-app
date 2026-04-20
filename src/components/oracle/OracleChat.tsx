'use client';

import React, { useState } from 'react';
import PixelCard from '../ui/PixelCard';
import PixelButton from '../ui/PixelButton';
import { motion } from 'framer-motion';

/**
 * OracleChat Component
 * Provides an interactive AI chat interface for tactical guidance.
 * Connects to the /api/oracle route.
 */
const OracleChat = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'oracle'; text: string }[]>([
    { role: 'oracle', text: 'ADVENTURER! I am the Oracle. Seeking the swiftest path to your destination?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMsg,
          context: { location: 'Central Hub', transit: 'Normal', goal: 'Fastest Route' } 
        }),
      });
      const data = await res.json();
      if (data.error) {
        setMessages(prev => [...prev, { role: 'oracle', text: `ERROR: ${data.error}` }]);
      } else {
        setMessages(prev => [...prev, { role: 'oracle', text: data.text || 'The Oracle is silent...' }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'oracle', text: 'THE CLOUDS ARE DARK. (Network Error)' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PixelCard title="THE ORACLE" variant="oracle" className="min-h-[300px] flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[200px] scrollbar-hide">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={msg.role === 'oracle' ? 'oracle-bubble italic text-blue-800' : 'text-right font-bold'}
          >
            {msg.text}
          </motion.div>
        ))}
        {isLoading && <div className="text-[8px] animate-pulse">Consulting the fates...</div>}
      </div>
      
      <div className="flex gap-2">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask for guidance..."
          className="flex-1 border-4 border-black p-2 text-[10px] outline-none"
        />
        <PixelButton onClick={sendMessage} size="sm">SEND</PixelButton>
      </div>
    </PixelCard>
  );
};

export default OracleChat;
