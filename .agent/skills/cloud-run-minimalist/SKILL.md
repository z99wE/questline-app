---
name: cloud-run-minimalist
description: "Used for deploying lean Next.js apps to Google Cloud Run while maintaining tiny repo sizes."
risk: safe
source: community
---

# Cloud Run Minimalist Deployment

## Goal
Generate a live URL via Cloud Run with zero architectural bloat.

## Instructions
- Use a multi-stage Dockerfile: `node:20-alpine` as base to keep image and repo config light.
- Implement `.dockerignore` to mirror `.gitignore` (prevents local junk in the build).
- Use `gcloud run deploy --source .` for the fastest path to a Live URL.
- Ensure the app listens on `PORT 8080` (Cloud Run default).

## Output
- Dockerfile (< 1KB)
- Deployment instructions for the README.
