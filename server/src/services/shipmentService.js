import { Shipment } from '../models/Shipment.js';

class ShipmentService {
  /**
   * Create a new shipment
   */
  async createShipment(data) {
    const shipment = new Shipment(data);
    return await shipment.save();
  }

  /**
   * Get all shipments with optional filtering
   */
  async getAllShipments(filters = {}) {
    return await Shipment.find(filters).sort({ createdAt: -1 });
  }

  /**
   * Get a single shipment by ID
   */
  async getShipmentById(id) {
    const shipment = await Shipment.findById(id);
    if (!shipment) throw new Error('Shipment not found');
    return shipment;
  }

  /**
   * Update shipment status and calculate dynamic risk
   */
  async updateShipmentStatus(id, statusData) {
    const shipment = await this.getShipmentById(id);
    
    if (statusData.status) shipment.status = statusData.status;
    if (statusData.delayProbability !== undefined) {
      shipment.delayProbability = statusData.delayProbability;
      
      // Calculate Risk Level based on probability
      if (shipment.delayProbability >= 75) {
        shipment.riskLevel = 'Critical';
      } else if (shipment.delayProbability >= 40) {
        shipment.riskLevel = 'High';
      } else if (shipment.delayProbability >= 15) {
        shipment.riskLevel = 'Medium';
      } else {
        shipment.riskLevel = 'Low';
      }
    }
    
    if (statusData.eta) shipment.eta = statusData.eta;

    return await shipment.save();
  }

  /**
   * Delete a shipment
   */
  async deleteShipment(id) {
    const result = await Shipment.findByIdAndDelete(id);
    if (!result) throw new Error('Shipment not found');
    return result;
  }
}

export default new ShipmentService();
