# The Neurodivergent Brain

## Project Overview
- **Name**: The Neurodivergent Brain
- **Goal**: An educational SPA helping adults understand neurodivergent brain profiles, self-screen, and explore relationship dynamics between different neurotypes.
- **Live URL**: https://theneurodivergentbrain.pages.dev

## Features

### Completed
- **Home Page**: Hero section with animated background, feature cards, and educational disclaimer
- **Neurotype Profiles (9 tabs)**: Neurotypical, ADHD-Combined, ADHD-Inattentive, ADHD-I + Dyslexia, Dyslexia, ASD Level 1, ASD Level 2, ASD Level 3, AuDHD — each with 18 clinical dimensions
- **Self-Assessment Tool**: 60 research-informed questions across 6 domains (Attention & Focus, Sensory Experience, Social Communication, Executive Function, Reading & Language, Emotional Regulation)
- **Brain Pair Explorer**: Select two neurotypes to see relationship dynamics including harmony points, friction zones, communication bridges, environment design, and intimate messages from each brain
- **About Page**: Research sources, privacy policy, clinical disclaimer
- **Custom AI-generated neurotype icons**: Abstract bioluminescent brain-form illustrations for each profile
- **Radar chart results**: Chart.js-powered brain profile spectrum visualization
- **Privacy-first**: All assessment data stored in localStorage, never transmitted

### Data Sources
- PMC/NIH peer-reviewed literature
- DSM-5-TR
- APA
- Barkley (2015), Willcutt et al. (2012), Weiss et al. (2014), Rong et al. (2021), Pennington (2006)

## Tech Stack
- **Backend**: Hono framework on Cloudflare Workers
- **Frontend**: Vanilla JavaScript SPA with Tailwind CSS (CDN)
- **Fonts**: Space Grotesk, Inter, Newsreader (Google Fonts)
- **Charts**: Chart.js
- **Icons**: Font Awesome 6
- **Hosting**: Cloudflare Pages

## Deployment
- **Platform**: Cloudflare Pages
- **Status**: Active
- **Domain**: theneurodivergentbrain.pages.dev
