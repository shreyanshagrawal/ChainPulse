import express from 'express';
import {
  createShipment,
  getAllShipments,
  getShipmentById,
  updateShipmentStatus,
  deleteShipment
} from '../controllers/shipmentController.js';

const router = express.Router();

router.route('/')
  .get(getAllShipments)
  .post(createShipment);

router.route('/:id')
  .get(getShipmentById)
  .delete(deleteShipment);

router.route('/:id/status')
  .patch(updateShipmentStatus);

export default router;
