# QuestLine: Tactical Logistics Hub

**QuestLine** is a dynamic mission-control application designed for high-stakes urban logistics and transit management. Built for the Google Antigravity Challenge, it leverages the **Google Maps API** to create a live, interactive tactical environment where "Commanders" secure hubs to optimize transit flow.

---

## 🛰️ Project Overview
QuestLine transforms mundane transit data into an interactive mission-ready dashboard. By integrating live map intelligence with a retro-heroic aesthetic, it provides Commanders with real-time field reports and Hub status assessments.

### 🎯 Key Vertical: Tactical Logistics
- **Persona**: Transit Overwatch / Crowd Commander.
- **Logic**: Dynamic Hub Securing. Commanders click map hubs to "secure" them, earning XP and stabilizing sectors.

---

## 🛠️ Approach & Logic
QuestLine focuses on **Practical Usability** and **Zero-Latency Intelligence**.

### 1. The Interactive Tactical Map
- Uses **Google Maps Advanced Marker API** for high-performance interactive hubs.
- Implements custom **Circle** overlays to visualize "Congestion Blooms" and mission zones.
- Provides a direct link between physical location data and regional XP rewards.

### 2. Tactical Terminal (Intel Engine)
- A robust, event-driven logging system that translates Map interactions into tactical briefs.
- Mocked intelligence scripts provide realistic feedback (e.g., "Hub Alpha Secured: Flow Stabilized") without the instability of external AI dependencies.

### 3. Commander Progression
- Persistent state management using **LocalStorage** to track Levels and XP.
- A heroic feedback loop that encourages active exploration and hub management.

---

## 🚀 How it Works
1. **Interactive Scans**: Explore the sector via the Quest Map. Blue, Red, and Yellow markers represent Port Echo, HUB Bravo, and HUB Alpha respectively.
2. **Secure Hubs**: Click on any Advanced Hub marker to "Secure" it.
3. **Intel Feedback**: Watch the **Tactical Terminal** for real-time mission logs and status updates from the sector.
4. **Level Up**: Amass XP to reach higher Command levels and stabilize New York District 1.

---

## 📐 Assumptions & Design
- **Local Intelligence**: Based on user feedback, the "Oracle" intelligence was shifted from a flaky AI backend to a stable, localized rule-based engine to ensure 100% mission uptime during evaluation.
- **Performance**: The application is optimized to be lightweight (< 1MB) for high-speed deployment and evaluation.

---

## 🛠️ Tech Stack
- **Framework**: Next.js (App Router)
- **Maps**: Google Maps JS SDK (Loader)
- **Styling**: Tailwind CSS + Custom 8-bit CSS Framework
- **Animation**: Framer Motion
- **Icons**: Lucide React

---

*&copy; 2026 QuestLine Tactical | For Antigravity Challenge Review*
