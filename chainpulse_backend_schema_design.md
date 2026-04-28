# ChainPulse — Backend Schema Design

## Product
ChainPulse

## Purpose
This document defines the backend database schema and data architecture for the ChainPulse hackathon prototype.

The schema is optimized for:
- rapid prototyping
- flexible supply-chain structures
- simulated real-time updates
- predictive analytics
- scalable future expansion

Database Type:
MongoDB

---

# 1. Database Collections Overview

```text
users
organizations
supplyChains
nodes
routes
shipments
warehouses
suppliers
inventory
alerts
riskEvents
analyticsSnapshots
notifications
```

---

# 2. Users Collection

# Collection Name
users

## Purpose
Stores admin user information.

---

## Schema
```javascript
{
  _id: ObjectId,

  name: String,
  email: String,
  password: String,

  role: {
    type: String,
    enum: ["admin"]
  },

  organizationId: ObjectId,

  createdAt: Date,
  updatedAt: Date
}
```

---

# 3. Organizations Collection

# Collection Name
organizations

## Purpose
Stores company/workspace information.

---

## Schema
```javascript
{
  _id: ObjectId,

  organizationName: String,
  industryType: String,
  operationalRegion: String,

  healthScore: Number,

  createdBy: ObjectId,

  createdAt: Date,
  updatedAt: Date
}
```

---

# 4. Supply Chains Collection

# Collection Name
supplyChains

## Purpose
Stores custom supply-chain structures.

---

## Schema
```javascript
{
  _id: ObjectId,

  organizationId: ObjectId,

  name: String,
  description: String,

  nodes: [ObjectId],
  routes: [ObjectId],

  createdAt: Date,
  updatedAt: Date
}
```

---

# 5. Nodes Collection

# Collection Name
nodes

## Purpose
Stores all supply-chain entities.

Examples:
- suppliers
- warehouses
- factories
- distributors

---

## Schema
```javascript
{
  _id: ObjectId,

  organizationId: ObjectId,
  supplyChainId: ObjectId,

  type: {
    type: String,
    enum: [
      "supplier",
      "warehouse",
      "factory",
      "distributor"
    ]
  },

  name: String,

  location: {
    state: String,
    country: String,
    latitude: Number,
    longitude: Number
  },

  metadata: {
    capacity: Number,
    currentStock: Number,
    reliabilityScore: Number,
    dailyConsumption: Number
  },

  createdAt: Date,
  updatedAt: Date
}
```

---

# 6. Routes Collection

# Collection Name
routes

## Purpose
Stores shipment paths between nodes.

---

## Schema
```javascript
{
  _id: ObjectId,

  organizationId: ObjectId,
  supplyChainId: ObjectId,

  sourceNodeId: ObjectId,
  destinationNodeId: ObjectId,

  distanceKm: Number,
  averageTravelTimeHours: Number,

  riskFactors: {
    trafficRisk: Number,
    weatherRisk: Number,
    politicalRisk: Number
  },

  createdAt: Date,
  updatedAt: Date
}
```

---

# 7. Suppliers Collection

# Collection Name
suppliers

## Purpose
Stores supplier-specific operational data.

---

## Schema
```javascript
{
  _id: ObjectId,

  organizationId: ObjectId,

  supplierName: String,
  suppliedMaterial: String,

  reliabilityScore: Number,

  averageDelayHours: Number,
  onTimeDeliveryRate: Number,

  activeRiskLevel: {
    type: String,
    enum: ["low", "medium", "critical"]
  },

  location: {
    state: String,
    country: String
  },

  createdAt: Date,
  updatedAt: Date
}
```

---

# 8. Warehouses Collection

# Collection Name
warehouses

## Purpose
Stores warehouse information.

---

## Schema
```javascript
{
  _id: ObjectId,

  organizationId: ObjectId,

  warehouseName: String,

  location: {
    state: String,
    country: String,
    latitude: Number,
    longitude: Number
  },

  capacity: Number,
  currentUtilization: Number,

  healthStatus: {
    type: String,
    enum: ["healthy", "warning", "critical"]
  },

  createdAt: Date,
  updatedAt: Date
}
```

---

# 9. Inventory Collection

# Collection Name
inventory

## Purpose
Tracks warehouse inventory levels and shortage predictions.

---

## Schema
```javascript
{
  _id: ObjectId,

  warehouseId: ObjectId,
  organizationId: ObjectId,

  productType: String,

  currentStock: Number,
  minimumThreshold: Number,
  dailyUsageRate: Number,

  predictedDaysRemaining: Number,

  shortageRiskLevel: {
    type: String,
    enum: ["low", "medium", "critical"]
  },

  linkedShipmentIds: [ObjectId],

  createdAt: Date,
  updatedAt: Date
}
```

---

# 10. Shipments Collection

# Collection Name
shipments

## Purpose
Stores all shipment tracking and prediction data.

---

## Schema
```javascript
{
  _id: ObjectId,

  organizationId: ObjectId,

  shipmentId: String,

  sourceNodeId: ObjectId,
  destinationNodeId: ObjectId,

  supplierId: ObjectId,
  routeId: ObjectId,

  productType: String,
  quantity: Number,

  importanceScale: {
    type: Number,
    min: 1,
    max: 10
  },

  acceptableErrorMarginHours: Number,

  status: {
    type: String,
    enum: [
      "awaiting_dispatch",
      "in_transit",
      "delayed",
      "delivered",
      "at_risk"
    ]
  },

  currentLocation: {
    latitude: Number,
    longitude: Number
  },

  expectedDeliveryDate: Date,
  predictedETA: Date,

  delayProbability: Number,

  riskLevel: {
    type: String,
    enum: ["low", "medium", "critical"]
  },

  shipmentHealthScore: Number,

  externalRiskFactors: {
    trafficRisk: Number,
    weatherRisk: Number,
    supplierRisk: Number,
    fuelRisk: Number,
    politicalRisk: Number,
    rawMaterialRisk: Number
  },

  timeline: [
    {
      status: String,
      timestamp: Date,
      note: String
    }
  ],

  createdAt: Date,
  updatedAt: Date
}
```

---

# 11. Alerts Collection

# Collection Name
alerts

## Purpose
Stores system-generated alerts.

---

## Schema
```javascript
{
  _id: ObjectId,

  organizationId: ObjectId,

  title: String,
  description: String,

  type: {
    type: String,
    enum: [
      "shipment_delay",
      "inventory_shortage",
      "supplier_risk",
      "weather_disruption",
      "route_disruption"
    ]
  },

  severity: {
    type: String,
    enum: ["low", "medium", "critical"]
  },

  relatedShipmentId: ObjectId,
  relatedWarehouseId: ObjectId,

  isRead: {
    type: Boolean,
    default: false
  },

  recommendedAction: String,

  createdAt: Date
}
```

---

# 12. Risk Events Collection

# Collection Name
riskEvents

## Purpose
Stores external disruption events.

---

## Schema
```javascript
{
  _id: ObjectId,

  organizationId: ObjectId,

  eventType: {
    type: String,
    enum: [
      "flood",
      "fuel_spike",
      "traffic",
      "political_issue",
      "raw_material_shortage",
      "supplier_delay"
    ]
  },

  title: String,
  description: String,

  affectedRegion: String,

  severity: {
    type: String,
    enum: ["low", "medium", "critical"]
  },

  impactScore: Number,

  affectedShipmentIds: [ObjectId],

  startDate: Date,
  expectedResolutionDate: Date,

  createdAt: Date
}
```

---

# 13. Notifications Collection

# Collection Name
notifications

## Purpose
Stores in-app notification events.

---

## Schema
```javascript
{
  _id: ObjectId,

  userId: ObjectId,
  organizationId: ObjectId,

  title: String,
  message: String,

  type: {
    type: String,
    enum: [
      "alert",
      "shipment_update",
      "risk_update",
      "inventory_warning"
    ]
  },

  relatedEntityId: ObjectId,

  isRead: {
    type: Boolean,
    default: false
  },

  createdAt: Date
}
```

---

# 14. Analytics Snapshots Collection

# Collection Name
analyticsSnapshots

## Purpose
Stores periodic analytics summaries for dashboard visualization.

---

## Schema
```javascript
{
  _id: ObjectId,

  organizationId: ObjectId,

  timestamp: Date,

  totalShipments: Number,
  delayedShipments: Number,
  criticalShipments: Number,

  overallHealthScore: Number,

  averageDelayHours: Number,

  supplierPerformanceScore: Number,

  shortageRiskCount: Number,

  topRiskFactor: String
}
```

---

# 15. Relationship Overview

```text
Organization
│
├── Users
├── Supply Chains
│   ├── Nodes
│   ├── Routes
│
├── Shipments
│   ├── Suppliers
│   ├── Routes
│   ├── Risk Events
│
├── Warehouses
│   ├── Inventory
│
├── Alerts
├── Notifications
└── Analytics Snapshots
```

---

# 16. Suggested Backend Architecture

# Recommended Structure

```text
/server
  /config
  /controllers
  /models
  /routes
  /middleware
  /services
  /utils
```

---

# Example Models Folder

```text
/models
  User.js
  Organization.js
  Shipment.js
  Warehouse.js
  Inventory.js
  Supplier.js
  Alert.js
  RiskEvent.js
```

---

# Example Services Folder

```text
/services
  predictionEngine.js
  shipmentSimulator.js
  riskGenerator.js
  inventoryForecast.js
```

---

# 17. Prediction Engine Logic Flow

```text
External Risk Event
        ↓
Route Risk Updated
        ↓
Shipment Delay Probability Updated
        ↓
Inventory Forecast Updated
        ↓
Health Score Recalculated
        ↓
Alert Generated
        ↓
Notification Triggered
```

---

# 18. Recommended Development Priority

# Priority 1
- shipments
- alerts
- inventory
- riskEvents

---

# Priority 2
- analyticsSnapshots
- notifications
- routes

---

# Priority 3
- advanced organization management
- optimization features

---

# 19. Final Schema Philosophy

The backend schema is designed to:
- simulate enterprise-grade supply-chain systems
- support predictive workflows
- remain lightweight for hackathon implementation
- enable rapid UI integration
- provide believable operational realism

The structure prioritizes:
- flexibility
- scalability of concept
- easy simulation
- analytics compatibility
- fast development speed

