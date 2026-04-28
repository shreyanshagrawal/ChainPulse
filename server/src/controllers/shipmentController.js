import shipmentService from '../services/shipmentService.js';

export const createShipment = async (req, res) => {
  try {
    const shipment = await shipmentService.createShipment(req.body);
    res.status(201).json({ success: true, data: shipment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllShipments = async (req, res) => {
  try {
    const shipments = await shipmentService.getAllShipments(req.query);
    res.status(200).json({ success: true, count: shipments.length, data: shipments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getShipmentById = async (req, res) => {
  try {
    const shipment = await shipmentService.getShipmentById(req.params.id);
    res.status(200).json({ success: true, data: shipment });
  } catch (error) {
    if (error.message === 'Shipment not found') {
      return res.status(404).json({ success: false, message: 'Shipment not found' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateShipmentStatus = async (req, res) => {
  try {
    const updatedShipment = await shipmentService.updateShipmentStatus(req.params.id, req.body);
    res.status(200).json({ success: true, data: updatedShipment });
  } catch (error) {
    if (error.message === 'Shipment not found') {
      return res.status(404).json({ success: false, message: 'Shipment not found' });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteShipment = async (req, res) => {
  try {
    await shipmentService.deleteShipment(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    if (error.message === 'Shipment not found') {
      return res.status(404).json({ success: false, message: 'Shipment not found' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};
