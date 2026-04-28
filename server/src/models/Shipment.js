import mongoose from 'mongoose';

const shipmentSchema = new mongoose.Schema({
  shipmentId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  source: {
    locationName: String,
    coordinates: [Number] // [longitude, latitude]
  },
  destination: {
    locationName: String,
    coordinates: [Number]
  },
  status: {
    type: String,
    enum: ['Pending', 'In Transit', 'Delayed', 'At Risk', 'Delivered'],
    default: 'Pending'
  },
  riskLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Low'
  },
  delayProbability: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  eta: {
    type: Date,
    required: true
  },
  cargoDetails: {
    type: String
  }
}, { timestamps: true });

export const Shipment = mongoose.model('Shipment', shipmentSchema);
