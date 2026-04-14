import express from 'express';
import {
  createComment,
  replyToComment,
  getStudentComments,
  getCommentReplies,
  getTPComments,
  deleteComment,
} from '../controllers/commentController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, authorize('student'), createComment);
router.post('/:commentId/reply', verifyToken, authorize('tp'), replyToComment);
router.get('/student', verifyToken, authorize('student'), getStudentComments);
router.get('/:commentId/replies', verifyToken, getCommentReplies);
router.get('/', verifyToken, authorize('tp'), getTPComments);
router.delete('/:id', verifyToken, deleteComment);

export default router;
