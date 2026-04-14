import express from 'express';
import {
  uploadCertificate,
  getMyCertificates,
  deleteCertificate,
  getAllCertificates,
} from '../controllers/certificateController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, authorize('student'), uploadCertificate);
router.get('/my', verifyToken, authorize('student'), getMyCertificates);
router.delete('/:id', verifyToken, authorize('student'), deleteCertificate);
router.get('/', verifyToken, authorize('admin', 'tp'), getAllCertificates);

export default router;
