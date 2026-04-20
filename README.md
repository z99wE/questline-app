# 🛡️ QuestLine

**Logistics & Crowd Management | Gamified Experience**

QuestLine is a high-performance logistics app built for event crowd management. It features a unique "Google Stitch" inspired layout combined with a classic 8-bit retro aesthetic.

## 📋 Hackathon Requirements Check
- **Vertical**: Logistics & Crowd Management
- **Repository Size**: ~128 KB (Well under 1.0 MB limit)
- **Image Policy**: 0 Images. Pure CSS & SVGs only.
- **Integration**: Google Maps API & Google Gemini API.

## 🧠 Approach & Logic
My approach for QuestLine centers on **"Game-ified Information Density."** Traditional logistics dashboards are often cluttered and uninspiring. By applying an 8-bit aesthetic (inspired by Google's Stitch and classic RPGs), I transform logistical data points into "Quests" and "Intel."

- **Logic**: The app uses a server-side API route to communicate with **Gemini 1.5 Flash**, injecting a specific "Oracle" system prompt that treats the real world as a game map. 
- **XP Engine**: I implemented a real-time XP accumulation system that rewards users for "completing missions" (logical transit steps). Data is persisted locally to simulate a player's character progression.

## ⚙️ How it Works
1. **The Hero Dashboard**: A grid-based layout that manages state for the user's level (LVL) and experience (XP).
2. **The Oracle (AI)**: Users send messages to the Oracle. The AI analyzes the user's context (simulated location and transit status) and returns tactical, roleplay-style advice to guide them through the crowd.
3. **Quest Map**: Integrated via **Google Maps JS API**, it uses a custom grayscale filter to match the 8-bit theme while retaining full map functionality. We use **Advanced markers** to highlight specific hubs.
4. **CSS-Only Assets**: Every visual—from the progress bars to the pixel-art borders—is generated via CSS `box-shadow` and `border-image` logic to minimize repository size.

## 🧐 Assumptions Made
- **Connectivity**: Assumes the user is connected to the internet to access Google Cloud services (Maps and Gemini).
- **Location**: Assumes NYC as the default logistical hub for the demonstration.
- **Persistence**: User progress is assumed to be local to the browser instance (LocalStorage).

## 🕹️ Key Features
- **Hero Dashboard**: Real-time quest map and modular logistics intel.
- **The Oracle**: AI-powered logistical advice (Gemini integration).
- **XP System**: Earn levels by navigating transit hubs efficiently.
- **Accessibility**: Screen-reader optimized landmarks and `aria-live` regions for status updates.

## 📦 Getting Started

### 1. Requirements
- Node.js 20+
- Google Maps API Key
- Google AI (Gemini) API Key

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key
GOOGLE_AI_API_KEY=your_gemini_key
```

### 4. Development
```bash
npm run dev
```

## ☁️ Deployment (Google Cloud Run - UNIVERSAL FIX)

The app now uses a **Runtime Configuration** model. This is 100% reliable as it avoids build-time sync issues. Use this command to deploy:

```bash
gcloud run deploy questline-app \
  --source . \
  --region asia-south1 \
  --set-env-vars="GOOGLE_AI_API_KEY=AIzaSyBxNHIfbscn7vpWjog4DUlvIZN3qjtuHL4,NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyARNn5yiYCJI8qWkeBZT6Pc5vVZZdZhJPQ" \
  --allow-unauthenticated
```

> [!TIP]
> If Google Maps shows "For development purposes only", ensure **Billing** is enabled for your project in the Google Cloud Console.

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Pure CSS 8-bit Borders
- **Animation**: Framer Motion
- **AI**: Google Generative AI (Gemini Flash)
- **Maps**: Google Maps JavaScript API

---
*Developed with ❤️ for the future of logistics.*
