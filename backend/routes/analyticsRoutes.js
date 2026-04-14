import express from 'express';
import {
  getOverallSkillDistribution,
  getDepartmentWiseInsights,
  getSkillGapAnalysis,
  getTrends,
  getSuggestedTrainings,
} from '../controllers/analyticsController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/skills', verifyToken, authorize('tp'), getOverallSkillDistribution);
router.get('/departments', verifyToken, authorize('tp'), getDepartmentWiseInsights);
router.get('/gaps', verifyToken, authorize('tp'), getSkillGapAnalysis);
router.get('/trends', verifyToken, authorize('tp'), getTrends);
router.get('/suggested-trainings', verifyToken, authorize('tp'), getSuggestedTrainings);

export default router;
