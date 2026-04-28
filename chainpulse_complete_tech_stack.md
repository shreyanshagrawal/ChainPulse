# ChainPulse — Complete Technical Stack Document

## Product
ChainPulse

## Purpose
This document defines the complete technical architecture and technology stack for the ChainPulse hackathon prototype.

The stack is optimized for:
- rapid development
- modern SaaS UI
- real-time simulation
- predictive analytics visualization
- low implementation complexity
- polished demo experience

---

# 1. Tech Stack Philosophy

ChainPulse is being built as a:
- full-stack web application
- simulation-driven prototype
- predictive analytics dashboard

Because the project timeline is extremely short (5 hours), the chosen stack prioritizes:
- familiarity
- speed
- ease of integration
- UI polish
- demo reliability

---

# 2. Frontend Stack

# Core Framework
## React

### Why React?
The team is already familiar with React and Express, allowing faster development and fewer implementation bottlenecks during the hackathon.

### Responsibilities
React will handle:
- dashboard rendering
- component management
- routing
- state management
- real-time UI updates
- analytics visualization

---

# Build Tool
## Vite

### Why Vite?
- extremely fast startup
- fast hot reload
- lightweight setup
- ideal for hackathon environments

### Usage
Used for:
- React project setup
- local development
- frontend bundling

---

# Routing
## React Router

### Usage
Used for:
- dashboard navigation
- shipment detail pages
- analytics navigation
- supply-chain builder flow

### Main Routes
```text
/dashboard
/shipments
/shipments/:id
/analytics
/alerts
/builder
/settings
```

---

# UI Framework
## shadcn/ui

### Why?
- modern enterprise SaaS appearance
- production-quality components
- Tailwind-native
- fast development
- clean UI consistency

### Components Used
- cards
- tables
- dialogs
- forms
- sidebars
- dropdowns
- sheets
- alerts
- toast notifications

---

# Styling
## Tailwind CSS

### Why?
- fastest styling workflow
- highly customizable
- responsive by default
- ideal for dashboards
- modern SaaS styling

### Usage
Used for:
- layout system
- responsive grids
- spacing
- color system
- animations
- dashboard styling

---

# Animation Library
## Framer Motion

### Why?
Adds smooth enterprise-style interactions.

### Usage
Used for:
- dashboard transitions
- health score animations
- alert animations
- loading states
- page transitions

### Note
Animations should remain subtle and minimal.

---

# 3. Visualization Stack

# Charts
## Recharts

### Why?
- simple React integration
- clean analytics visuals
- lightweight
- easy customization

### Used For
- delay prediction graphs
- inventory forecasting
- supplier analytics
- risk distribution
- shipment trends
- health score history

---

# Maps
## Leaflet

### Why?
- lightweight
- easy integration
- free and open-source
- sufficient for prototype needs

### Used For
- live shipment tracking
- route visualization
- warehouse locations
- risk zones

### Map Features
- active shipment markers
- clickable routes
- shipment detail navigation
- disruption overlays

---

# 4. Backend Stack

# Runtime Environment
## Node.js

### Why?
- fast development
- same language across stack
- massive ecosystem
- ideal for APIs and simulation

---

# Backend Framework
## Express.js

### Why?
- lightweight
- flexible
- quick API development
- easy middleware handling

### Responsibilities
Express handles:
- shipment APIs
- analytics APIs
- alert APIs
- simulated data endpoints
- prediction engine execution
- supply-chain management APIs

---

# API Structure

## Example Endpoints
```text
GET /api/shipments
GET /api/shipments/:id
GET /api/analytics
GET /api/alerts
POST /api/builder/node
POST /api/builder/route
GET /api/risk-feed
```

---

# 5. Database Stack

# Database
## MongoDB

### Why?
- flexible schema
- ideal for rapidly changing structures
- excellent JSON support
- fast prototyping

### Collections
- users
- organizations
- shipments
- warehouses
- suppliers
- alerts
- riskEvents
- supplyChains

---

# Cloud Database Hosting
## MongoDB Atlas

### Why?
- quick setup
- cloud hosted
- free tier sufficient
- easy integration

---

# 6. Prediction Engine

# Architecture
## Rule-Based Prediction Engine

### Important Note
This is NOT a trained ML model.

The prototype simulates predictive intelligence using:
- weighted conditions
- rule-based logic
- historical trend simulation

---

# Delay Prediction Inputs
- traffic congestion
- weather conditions
- historical delays
- supplier reliability
- route risk

---

# Outputs
- delay probability
- predicted ETA
- risk level
- shipment health

---

# Example Logic
```javascript
if (traffic > 70 && weatherRisk > 60) {
  delayProbability += 35;
}
```

---

# Shortage Prediction Logic

## Inputs
- inventory level
- daily usage rate
- shipment ETA
- supplier reliability

## Outputs
- shortage probability
- days until shortage
- warehouse risk level

---

# 7. Simulation Engine

# Purpose
Create realistic real-time operational behavior.

---

# Simulated Data Includes
- shipment movement
- inventory changes
- delay fluctuations
- disruption events
- supplier performance changes

---

# Implementation
Uses:
```javascript
setInterval()
```
with randomized value generation.

---

# Update Frequency
Visual updates every:
- 5–10 seconds

System presents this as:
- 5-minute operational updates

---

# 8. External Risk Intelligence

# Risk Sources
The system simulates:
- traffic congestion
- weather disruptions
- fuel price spikes
- political instability
- supplier delays
- raw material shortages

---

# Prototype Data Strategy

## Recommended Approach
Use:
- randomized JSON events
- manually injected disruption events
- static mock datasets

---

# Optional APIs (If Time Allows)

## Weather API
OpenWeatherMap

## Maps & Traffic
Google Maps API

---

# Recommendation
Avoid complex web scraping during the hackathon.

Focus on:
- believable simulation
- polished UI
- clear prediction flow

---

# 9. Notifications

# Notification System
## Sonner

### Why?
- beautiful toast notifications
- minimal setup
- modern SaaS appearance

### Used For
- critical alerts
- shipment warnings
- shortage notifications
- disruption events

---

# 10. Authentication

# Recommended Approach
Simple demo authentication.

---

# Why?
Authentication is NOT the core value of ChainPulse.

Time should instead be invested into:
- dashboard quality
- prediction engine visuals
- analytics
- alert system

---

# Suggested Login
```text
Demo Admin Login
Email: demo@chainpulse.ai
Password: demo123
```

---

# 11. UI/UX Design System

# Design Inspiration
Inspired by:
- Stripe
- Linear
- Vercel

---

# Visual Style
- clean enterprise layouts
- soft shadows
- rounded corners
- analytics-focused spacing
- modern typography
- subtle gradients
- minimal clutter

---

# UX Goals
- fast readability
- operational clarity
- enterprise professionalism
- intuitive navigation

---

# 12. Recommended Folder Structure

```text
/src
  /components
    /charts
    /maps
    /alerts
    /cards
    /sidebar
    /builder

  /pages
    /Dashboard
    /Shipments
    /Analytics
    /Alerts
    /Builder
    /Settings

  /services
    api.js
    shipmentService.js
    analyticsService.js

  /utils
    predictionEngine.js
    simulationEngine.js
    riskGenerator.js

/server
  /routes
  /controllers
  /models
  /middleware
```

---

# 13. Deployment Stack

# Frontend Deployment
## Vercel

### Why?
- instant deployment
- easy React hosting
- free tier sufficient
- ideal for demos

---

# Backend Deployment
## Render or Railway

### Why?
- simple Express deployment
- free tier available
- quick setup

---

# Database Hosting
## MongoDB Atlas

---

# 14. Team Responsibility Split

# Team Member 1
Frontend dashboard & UI

---

# Team Member 2
Backend APIs & database integration

---

# Team Member 3
Prediction engine & analytics visualizations

---

# Team Member 4
Supply-chain builder, alerts, and final integration

---

# 15. Build Priority Order

# Priority 1 — Must Build
- dashboard
- prediction engine visuals
- alert system
- shipment details page
- fake live updates

---

# Priority 2 — Important
- analytics page
- supply-chain builder
- risk feed

---

# Priority 3 — Skip If Needed
- real APIs
- advanced auth
- complex ML
- enterprise integrations

---

# 16. Core Engineering Philosophy

The success of ChainPulse depends more on:
- product clarity
- UI polish
- believable predictions
- operational storytelling

than backend complexity.

The prototype should feel:
- intelligent
- operational
- realistic
- enterprise-ready

while remaining lightweight enough to build rapidly.

---

# 17. Final Technical Summary

ChainPulse uses a modern React + Express full-stack architecture optimized for rapid prototyping, predictive analytics visualization, and simulated real-time supply-chain intelligence.

The stack prioritizes:
- speed
- scalability of concept
- modern enterprise UX
- believable predictive workflows
- polished demo execution

