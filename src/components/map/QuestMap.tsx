'use client';

import React, { useEffect, useRef, useState } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { motion } from 'framer-motion';

/**
 * QuestMap Component - GAMEPLAY UPGRADE
 * - Interactive Hubs (Click to Secure)
 * - Mission Zone Visualization
 * - Real-time Coordinate Streaming
 */
interface QuestMapProps {
  onHubSecured?: (hubName: string, xp: number) => void;
}

const QuestMap = ({ onHubSecured }: QuestMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [hasKey, setHasKey] = useState<boolean | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        const configRes = await fetch('/api/config');
        const configData = await configRes.json();
        const apiKey = configData.mapsKey;

        if (!apiKey) {
          setHasKey(false);
          return;
        }

        setHasKey(true);
        setOptions({ key: apiKey, v: 'weekly' });

        const { Map } = await importLibrary('maps') as google.maps.MapsLibrary;
        const { AdvancedMarkerElement, PinElement } = await importLibrary('marker') as google.maps.MarkerLibrary;
        const { Circle } = await importLibrary('maps') as any; 
        
        if (mapRef.current) {
          const map = new Map(mapRef.current, {
            center: { lat: 40.7527, lng: -73.9772 }, // Center on Hub Alpha
            zoom: 13,
            mapId: 'QUESTLINE_TACTICAL_MAP_V2',
            styles: [
              { "featureType": "all", "elementType": "all", "stylers": [{ "saturation": -100 }, { "gamma": 0.5 }] }
            ],
            disableDefaultUI: true,
          });

          // Helper to add interactive hubs
          const addHub = (name: string, pos: { lat: number, lng: number }, color: string, xp: number) => {
            const pin = new PinElement({ 
              background: color, 
              borderColor: "#000", 
              glyphColor: "#000", 
              scale: 1.2 
            });
            
            const marker = new AdvancedMarkerElement({ 
              map, 
              position: pos, 
              title: name, 
              content: pin.element,
              gmpClickable: true 
            });

            marker.addListener('click', () => {
              if (onHubSecured) {
                onHubSecured(name, xp);
              }
            });

            return marker;
          };

          // 1. HUB ALPHA: Central Station
          addHub("HUB ALPHA (CENTRAL)", { lat: 40.7527, lng: -73.9772 }, "#FFD700", 50);

          // 2. HUB BRAVO: Zone B (Battery Park)
          addHub("HUB BRAVO (ZONE B)", { lat: 40.7033, lng: -74.0170 }, "#FF4500", 75);

          // 3. PORT ECHO: Downtown
          addHub("PORT ECHO (DOWNTOWN)", { lat: 40.7127, lng: -74.0059 }, "#1E90FF", 60);

          // 4. MISSION AREA: Congestion Bloom
          new Circle({
            map,
            center: { lat: 40.7033, lng: -74.0170 },
            radius: 1200, 
            fillColor: "#FF0000",
            fillOpacity: 0.15,
            strokeColor: "#FF0000",
            strokeOpacity: 0.5,
            strokeWeight: 1,
            clickable: false
          });

          setMapLoaded(true);
        }
      } catch (error) {
        console.error("Error loading Tactical Map:", error);
        setHasKey(false);
      }
    };

    initMap();
  }, []);

  return (
    <div className="relative w-full h-[450px] border-4 border-black mb-6 overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,0.2)]">
      <div className="absolute top-2 left-2 z-10 bg-black text-white px-2 py-1 text-[8px] uppercase tracking-widest border border-white font-mono flex items-center gap-2">
        <span className="w-2 h-2 bg-red-500 animate-pulse rounded-full" />
        LIVE_TACTICAL_FEED // SECTOR: NY_DISTRICT_1
      </div>
      
      {/* Tactical Scanner Animation */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden opacity-30">
        <div className="w-full h-[1px] bg-quest-green shadow-[0_0_10px_rgba(34,197,94,1)] animate-scan" />
      </div>

      {hasKey === false && (
        <div className="absolute inset-0 bg-red-100 flex flex-col items-center justify-center p-4 text-center z-30 font-mono">
          <div className="text-red-600 text-[10px] mb-2 font-bold underline animate-bounce">[!] SYSTEM_CRITICAL_ERROR [!]</div>
          <p className="text-black text-[8px] uppercase leading-tight">
            Map Encryption Key Invalid. Mission Aborted.
          </p>
        </div>
      )}
      
      {!mapLoaded && hasKey !== false && (
        <div className="absolute inset-0 bg-gray-200 flex flex-col items-center justify-center font-mono z-20">
          <div className="text-[10px] animate-pulse">ESTABLISHING SATELLITE UPLINK...</div>
          <div className="w-32 h-1 bg-black/10 mt-2">
            <motion.div className="h-full bg-black" animate={{ width: ["0%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity }} />
          </div>
        </div>
      )}
      
      <div ref={mapRef} className="w-full h-full grayscale-[50%]" />
      
      {/* Map Interactive Prompt */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-white/90 border-2 border-black px-2 py-1 text-[7px] uppercase font-bold tracking-tighter text-black pointer-events-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        &gt; CLICK_HUBS_TO_SECURE_SECTOR
      </div>
    </div>
  );
};

export default QuestMap;
