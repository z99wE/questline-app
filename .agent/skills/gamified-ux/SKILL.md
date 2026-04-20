---
name: gamified-ux
description: "Used for building lightweight, CSS-driven game interfaces for non-game apps."
risk: safe
source: community
---

# Gamified UX Implementation

## Goal
Create engaging, rewarding interfaces using only code and standard CSS/SVGs.

## Instructions
- Use `framer-motion` for "reward" animations (XP popups, level-up shakes).
- Implement "Progressive Disclosure": Only show the next step of the "Quest" (exit path).
- Sound effects: Use browser-native Audio API with external CDN links (no local .mp3).
- Visuals: Use Tailwind `animate-pulse` and `gradients` to signify "High Traffic" zones.

## Constraints
- No heavy game engines (Phaser/Three.js). Keep it DOM-based.
- Ensure "Game" elements don't hinder accessibility (use ARIA labels).
