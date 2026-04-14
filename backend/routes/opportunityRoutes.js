import express from 'express';
import {
  createOpportunity,
  getApprovedOpportunities,
  getPendingOpportunities,
  approveOpportunity,
  rejectOpportunity,
  bookmarkOpportunity,
  likeOpportunity,
  deleteOpportunity,
} from '../controllers/opportunityController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, authorize('student'), createOpportunity);
router.get('/approved', verifyToken, getApprovedOpportunities);
router.get('/pending', verifyToken, authorize('admin'), getPendingOpportunities);
router.put('/:id/approve', verifyToken, authorize('admin'), approveOpportunity);
router.put('/:id/reject', verifyToken, authorize('admin'), rejectOpportunity);
router.put('/:id/bookmark', verifyToken, authorize('student'), bookmarkOpportunity);
router.put('/:id/like', verifyToken, authorize('student'), likeOpportunity);
router.delete('/:id', verifyToken, deleteOpportunity);

export default router;
