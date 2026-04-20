'use client';

import React, { useEffect, useRef, useState } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

/**
 * QuestMap Component - TACTICAL UPGRADE
 * - Multi-hub markers (Central, Zone B, Port Echo)
 * - High-congestion red zone overlay
 * - Dynamic grayscale styling
 */
const QuestMap = () => {
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
        const { Circle } = await importLibrary('maps') as any; // Still in core maps
        
        if (mapRef.current) {
          const map = new Map(mapRef.current, {
            center: { lat: 40.7300, lng: -73.9950 }, // Centered to see both hubs
            zoom: 12,
            mapId: 'QUESTLINE_TACTICAL_ID',
            styles: [
              { "featureType": "all", "elementType": "all", "stylers": [{ "saturation": -100 }, { "gamma": 0.5 }] }
            ],
            disableDefaultUI: true,
          });

          // 1. HUB ALPHA: Central Station
          const pinAlpha = new PinElement({ background: "#FFD700", borderColor: "#000", glyphColor: "#000", scale: 1.2 });
          new AdvancedMarkerElement({ map, position: { lat: 40.7527, lng: -73.9772 }, title: "HUB ALPHA (CENTRAL)", content: pinAlpha.element });

          // 2. HUB BRAVO: Zone B (Battery Park)
          const pinBravo = new PinElement({ background: "#FF4500", borderColor: "#000", glyphColor: "#000", scale: 1.2 });
          new AdvancedMarkerElement({ map, position: { lat: 40.7033, lng: -74.0170 }, title: "HUB BRAVO (ZONE B)", content: pinBravo.element });

          // 3. PORT ECHO: Downtown
          const pinEcho = new PinElement({ background: "#1E90FF", borderColor: "#000", glyphColor: "#000", scale: 1.2 });
          new AdvancedMarkerElement({ map, position: { lat: 40.7127, lng: -74.0059 }, title: "PORT ECHO (DOWNTOWN)", content: pinEcho.element });

          // 4. TACTICAL CONGESTION ZONE (Red Overlay)
          new Circle({
            map,
            center: { lat: 40.7033, lng: -74.0170 }, // Centered on Zone B
            radius: 800, // 800 meters
            fillColor: "#FF0000",
            fillOpacity: 0.2,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
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
    <div className="relative w-full h-[400px] border-4 border-black mb-4 overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] focus-within:ring-2 focus-within:ring-black">
      <div className="absolute top-2 left-2 z-10 bg-black text-white px-2 py-1 text-[8px] uppercase tracking-widest border border-white">
        QUEST MAP // TACTICAL_INTEL_STREAM
      </div>
      
      {/* Tactical Scanner Animation */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden opacity-20">
        <div className="w-full h-[2px] bg-quest-green shadow-[0_0_15px_rgba(34,197,94,1)] animate-scan" />
      </div>

      {hasKey === false && (
        <div className="absolute inset-0 bg-red-100 flex flex-col items-center justify-center p-4 text-center z-30">
          <div className="text-red-600 font-pixel text-[10px] mb-2 font-bold underline">!!! MISSION CRITICAL ERROR !!!</div>
          <p className="text-black text-[8px] uppercase leading-tight">
            Tactical Map Key missing. Check Deployment Logs.
          </p>
        </div>
      )}
      
      {!mapLoaded && hasKey !== false && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center font-pixel animate-pulse z-20">
          SCANNING HUB SECTORS...
        </div>
      )}
      
      <div ref={mapRef} className="w-full h-full grayscale-[50%]" />
    </div>
  );
};

export default QuestMap;
