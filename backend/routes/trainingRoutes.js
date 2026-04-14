import express from 'express';
import {
  createTraining,
  getTrainings,
  registerForTraining,
  getMyTrainings,
  deleteTraining,
} from '../controllers/trainingController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, authorize('tp'), createTraining);
router.get('/', verifyToken, getTrainings);
router.post('/:trainingId/register', verifyToken, authorize('student'), registerForTraining);
router.get('/my-trainings', verifyToken, authorize('student'), getMyTrainings);
router.delete('/:id', verifyToken, authorize('tp'), deleteTraining);

export default router;
