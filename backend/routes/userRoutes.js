import express from 'express';
import {
  getStudents,
  getStudentsByDepartment,
  getStudentProfile,
  deleteUser,
} from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, authorize('admin', 'tp'), getStudents);
router.get('/department/:department', verifyToken, authorize('admin', 'tp'), getStudentsByDepartment);
router.get('/:studentId', verifyToken, getStudentProfile);
router.delete('/:id', verifyToken, authorize('admin'), deleteUser);

export default router;
