# ChainPulse — Application Flow Document

## Product
ChainPulse

## Document Type
Application Flow & User Journey Specification

---

# 1. Purpose

This document defines the end-to-end application flow for ChainPulse, including:
- user onboarding
- navigation structure
- page hierarchy
- feature interactions
- dashboard flow
- shipment lifecycle
- predictive alert interactions
- notification behavior

The goal is to provide a clear implementation blueprint for the hackathon prototype.

---

# 2. Core Product Experience

## Primary User
Operations Manager

## Core User Goal
Predict supply-chain disruptions before they cause delays, shortages, or operational downtime.

## Core Product Journey
```text
Login → Setup Organization → Build Supply Chain → Monitor Dashboard → Receive Predictions → Take Preventive Action
```

---

# 3. Information Architecture

# Main Navigation Structure

```text
Dashboard
├── Overview
├── Live Risk Feed
├── Health Score
├── Active Shipments

Shipments
├── All Shipments
├── Shipment Details
├── Shipment Tracking

Supply Chain Builder
├── Create Nodes
├── Connect Routes
├── Manage Supply Chain

Analytics
├── Delay Analytics
├── Supplier Performance
├── Inventory Forecasting
├── Risk Analysis

Alerts
├── Active Alerts
├── Alert History

Settings
├── Organization Settings
├── Profile Settings
```

---

# 4. Authentication Flow

# 4.1 Entry Experience

## Landing Screen
Users first enter a modern SaaS-style landing page.

Primary CTA:
- Login
- Create Account
- Demo Access

---

# 4.2 Signup Flow

## User Inputs
- Organization Name
- Admin Name
- Email
- Password

## System Action
Creates:
- organization workspace
- admin account

## Success State
Redirect to onboarding flow.

---

# 4.3 Login Flow

## Login Methods
- Email + Password
- Demo Login

## Success State
Redirect to onboarding or dashboard.

---

# 5. First-Time User Onboarding

# 5.1 Organization Setup

## User Actions
User configures:
- organization name
- industry type
- operational region

## Optional Demo Data
Users can:
- import demo supply-chain template
OR
- create custom setup

---

# 5.2 Supply Chain Initialization

## Goal
Allow companies to define their own operational structure.

## Flow Type
Hybrid Builder:
- form-based setup
- lightweight visual node connection

---

# 5.3 Supply Chain Builder Flow

## Step 1 — Add Nodes
User creates:
- Suppliers
- Warehouses
- Factories
- Distribution Centers

---

## Step 2 — Configure Node Details

### Example Fields
#### Supplier
- Supplier Name
- Reliability Score
- Region
- Material Type

#### Warehouse
- Inventory Capacity
- Current Stock
- Threshold Level

#### Factory
- Production Dependency
- Daily Consumption

---

## Step 3 — Connect Routes
User defines:
- shipment routes
- source/destination pairs
- operational dependencies

Example:
```text
Supplier → Warehouse → Factory → Distributor
```

---

## Step 4 — Save Supply Chain

### System Action
ChainPulse generates:
- operational graph
- shipment simulation network
- prediction monitoring setup

## Success State
Redirect to main dashboard.

---

# 6. Dashboard Flow

# 6.1 Dashboard Goal

Provide instant visibility into:
- supply-chain health
- predicted disruptions
- shipment risks
- inventory threats

---

# 6.2 Dashboard Layout

## Navigation Style
Left-sidebar enterprise SaaS dashboard.

---

## Dashboard Sections

### Top Navigation Bar
Contains:
- search
- organization selector
- notification center
- profile menu

---

## Left Sidebar
Contains:
- Dashboard
- Shipments
- Supply Chain Builder
- Analytics
- Alerts
- Settings

---

# 6.3 Dashboard Widgets

## Global Health Score
Primary hero component.

Displays:
- overall supply-chain health
- healthy/warning/critical state

---

## Active Shipments
Displays:
- total active shipments
- delayed shipments
- high-risk shipments

---

## Live Shipment Map
Displays:
- active shipment routes
- warehouse nodes
- risk zones
- shipment movement

Map Features:
- click shipment
- navigate to shipment detail page

---

## Live Risk Feed
Displays:
- weather disruptions
- political instability
- fuel spikes
- supplier issues
- raw material shortages

---

## Prediction Engine Visuals
Displays:
- delay probability trends
- predicted shortages
- ETA confidence levels
- route risk severity

This section acts as the product’s primary “wow moment.”

---

## Alert Summary Panel
Displays:
- critical alerts
- medium alerts
- unread alerts

---

# 7. Shipment Flow

# 7.1 Shipment Creation

## Shipment Sources
- manually created shipments
- auto-generated simulated shipments

---

## Shipment Creation Fields

### Required Inputs
- Shipment ID
- Source
- Destination
- Product Type
- Supplier
- Quantity
- Expected Delivery Date
- Importance Scale
- Acceptable Error Margin

---

## System Actions After Creation
ChainPulse automatically:
- assigns shipment route
- calculates initial ETA
- generates risk baseline
- connects inventory dependencies

---

# 7.2 Shipment Monitoring Flow

## User Journey
Dashboard → Shipment Card → Shipment Details Page

---

# 7.3 Shipment Details Page

## Purpose
Provide deep operational visibility for a specific shipment.

---

## Shipment Overview Section
Displays:
- Shipment ID
- Current Status
- Source
- Destination
- Assigned Supplier
- ETA
- Delay Probability
- Risk Level

---

## Live Tracking Section
Displays:
- shipment route
- live shipment position
- affected risk zones

---

## Prediction Analysis Section
Displays:
- predicted delay duration
- confidence level
- route risk score
- historical delay comparison

---

## External Risk Intelligence Section
Displays active risk contributors:
- weather issues
- traffic congestion
- supplier instability
- fuel spikes
- raw material shortages

---

## Recommended Actions Section
Suggested mitigations:
- reroute shipment
- contact alternate supplier
- increase warehouse buffer stock
- prioritize shipment

---

# 8. Predictive Alert Flow

# 8.1 Alert Generation Logic

Alerts are triggered when:
- predicted delay exceeds threshold
- inventory risk increases
- external disruption detected
- supplier reliability drops

---

# 8.2 Alert Severity Levels

## Low
Minor operational impact.

## Medium
Potential disruption risk.

## Critical
High probability of operational failure.

---

# 8.3 Notification UX

## Notification Type
Toast popup notifications.

---

## Example Notification
"Critical Alert: Flood risk may delay Shipment S-204 by 8 hours."

---

# 8.4 Alert Interaction

## User Actions
Users can:
- open analytics page
- mark alert as read

---

## Alert Navigation
Clicking alert redirects user to:
- analytics page
OR
- relevant shipment details page

---

# 9. Analytics Flow

# 9.1 Analytics Purpose

Provide predictive operational intelligence.

---

# 9.2 Analytics Sections

## Delay Analytics
Displays:
- delay trends
- high-risk routes
- predicted disruptions

---

## Supplier Performance Analytics
Displays:
- supplier reliability scores
- late delivery frequency
- supplier risk comparison

---

## Inventory Forecasting
Displays:
- warehouse inventory depletion
- shortage prediction timelines
- critical stock warnings

---

## Risk Distribution Analytics
Displays:
- disruption source breakdown
- environmental risk impact
- shipment vulnerability analysis

---

# 9.3 Analytics Filters

Users can filter by:
- supplier
- warehouse
- risk level
- timeframe

---

# 10. External Risk Intelligence Flow

# 10.1 Risk Sources

Prototype risk sources include:
- traffic congestion
- weather disruptions
- fuel price spikes
- political instability
- supplier delays
- raw material shortages

---

# 10.2 Risk Data Generation

## Prototype Approach
- randomized simulated APIs
- manually injected disruption events
- optional lightweight web scraping/API integrations

---

# 10.3 Risk Impact Flow

```text
External Event → Risk Engine → Shipment Impact → Delay Prediction → Inventory Impact → Alert Trigger
```

---

# 11. Example End-to-End Scenario

# Scenario: Flood-Induced Shortage

## Step 1
Flood occurs in transportation region.

---

## Step 2
External risk engine detects disruption.

---

## Step 3
Prediction engine increases shipment delay probability.

---

## Step 4
Inventory forecasting predicts shortage in warehouse.

---

## Step 5
Critical toast notification appears.

---

## Step 6
Operations manager opens analytics page.

---

## Step 7
Dashboard recommends contacting alternate suppliers.

---

## Step 8
Business prepares before operational disruption occurs.

---

# 12. UI/UX Design Direction

## Design Style
Linear/Stripe-inspired enterprise SaaS dashboard.

---

## Visual Characteristics
- clean layouts
- minimal clutter
- soft enterprise gradients
- analytics-first design
- modern typography
- dark/light neutral palette
- smooth transitions

---

## UX Goals
- fast comprehension
- low cognitive load
- high operational visibility
- polished enterprise appearance

---

# 13. Prototype Priorities

## Highest Priority Features
### 1. Dashboard
Must feel polished and operational.

### 2. Prediction Engine Visuals
Primary differentiation feature.

### 3. Alerts & Notifications
Must feel real-time and intelligent.

### 4. Supply Chain Builder
Must demonstrate customization capability.

---

# 14. WOW Moment

## Core Demo Moment
The system predicts a future shortage before it happens and alerts the operations manager early enough to prevent disruption.

---

## Demo Sequence
```text
External disruption occurs
→ prediction engine detects delay
→ inventory shortage predicted
→ health score drops
→ critical alert triggered
→ mitigation recommendation displayed
```

---

# 15. Technical Flow

# Frontend
- Next.js
- React
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Recharts
- Mapbox/Leaflet

---

# Backend
- Node.js
- Express.js

---

# Database
- MongoDB

---

# Simulation Engine
- Randomized shipment generation
- Simulated external risk APIs
- Rule-based prediction engine

---

# 16. Final Experience Summary

ChainPulse delivers a predictive operational intelligence experience where supply-chain managers move from reactive firefighting to proactive disruption prevention.

