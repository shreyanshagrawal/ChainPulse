import mongoose from 'mongoose';
import { Shipment } from '../models/Shipment.js';
import { generatePredictionReport } from '../utils/predictionEngine.js';

const isDbConnected = () => mongoose.connection.readyState === 1;

class SimulationEngine {
  constructor() {
    this.intervalId = null;
    this.tickRate = 15000; // Run every 15 seconds for demonstration purposes
  }

  /**
   * Starts the simulation engine loop
   */
  start() {
    if (this.intervalId) return;
    console.log(`[Simulation Engine] Started. Ticking every ${this.tickRate / 1000}s`);
    
    this.intervalId = setInterval(() => {
      this.tick();
    }, this.tickRate);
  }

  /**
   * Stops the simulation engine loop
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('[Simulation Engine] Stopped.');
    }
  }

  /**
   * The core execution loop
   */
  async tick() {
    try {
      console.log('[Simulation Engine] Tick executing...');
      await this.simulateLiveShipmentUpdates();
      await this.simulateInventoryDepletion();
      this.simulateRandomDisruption();
    } catch (error) {
      console.error('[Simulation Engine] Error during tick:', error);
    }
  }

  /**
   * Fetches active shipments and randomly alters their operational environment
   */
  async simulateLiveShipmentUpdates() {
    // Skip if no DB connection (e.g., running without MongoDB in hackathon mode)
    if (!isDbConnected()) {
      console.log('[Simulation Engine] No DB connection — skipping shipment updates.');
      return;
    }
    // Note: In a real environment, we'd limit this query or paginate
    const activeShipments = await Shipment.find({ status: { $in: ['Pending', 'In Transit'] } });
    
    if (activeShipments.length === 0) return;

    for (const shipment of activeShipments) {
      // Randomly decide if this shipment's environment changes this tick (30% chance)
      if (Math.random() > 0.3) continue;

      // Generate fake real-time telemetry
      const mockInputs = {
        trafficRisk: Math.floor(Math.random() * 50), // 0-50 normal
        weatherRisk: Math.floor(Math.random() * 40), // 0-40 normal
        supplierReliability: 85, 
        historicalDelays: 10
      };

      // Recalculate using our Prediction Engine
      const prediction = generatePredictionReport(mockInputs, shipment.eta);

      // Apply prediction to shipment
      shipment.delayProbability = prediction.delayProbability;
      shipment.riskLevel = prediction.riskLevel;
      
      // If it became critical, automatically mark as Delayed
      if (prediction.riskLevel === 'Critical') {
        shipment.status = 'Delayed';
        shipment.eta = prediction.predictedEta;
        // NOTE: In a full implementation, we would trigger an Alert here via AlertService
        console.log(`[Simulation Engine] ALERT: Shipment ${shipment.shipmentId} became Critical!`);
      }

      await shipment.save();
    }
    console.log(`[Simulation Engine] Updated telemetry for ${activeShipments.length} shipments.`);
  }

  /**
   * Simulates warehouses burning through stock daily
   */
  async simulateInventoryDepletion() {
    // In a full implementation, you would query Inventory models.
    // For the hackathon, we simulate the logic:
    const depletionRate = Math.floor(Math.random() * 5) + 1; // 1-5 units per tick
    // console.log(`[Simulation Engine] Global inventory depleted by ${depletionRate} units.`);
  }

  /**
   * 1-in-10 chance to spawn a major global disaster
   */
  simulateRandomDisruption() {
    const isDisaster = Math.random() < 0.1;
    if (!isDisaster) return;

    const disasters = [
      "Severe flooding in Southeast Asia",
      "Port strike initiated in Los Angeles",
      "Suez Canal temporary blockage",
      "Unexpected customs freeze in EU"
    ];
    
    const event = disasters[Math.floor(Math.random() * disasters.length)];
    console.log(`\n🚨 [Simulation Engine] MAJOR DISRUPTION TRIGGERED: ${event} 🚨\n`);
    
    // In a full implementation, we would create a RiskEvent document and broadcast via WebSockets
  }
}

export default new SimulationEngine();
