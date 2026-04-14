import Comment from '../models/Comment.js';
import User from '../models/User.js';

export const createComment = async (req, res) => {
  try {
    const { message, replyTo } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ message: 'Message cannot be empty' });
    }

    const comment = new Comment({
      studentId: req.userId,
      message,
      isReply: !!replyTo,
      replyTo,
    });

    await comment.save();

    res.status(201).json({
      success: true,
      message: 'Comment created successfully',
      comment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const replyToComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { message } = req.body;

    const originalComment = await Comment.findById(commentId);
    if (!originalComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const reply = new Comment({
      tpOfficerId: req.userId,
      message,
      isReply: true,
      replyTo: commentId,
    });

    await reply.save();

    // Update original comment as read
    originalComment.read = true;
    await originalComment.save();

    res.status(201).json({
      success: true,
      message: 'Reply sent successfully',
      reply,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      studentId: req.userId,
      isReply: false,
    })
      .populate('replyTo')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommentReplies = async (req, res) => {
  try {
    const { commentId } = req.params;
    const replies = await Comment.find({
      replyTo: commentId,
      isReply: true,
    })
      .populate('tpOfficerId', 'name email')
      .sort({ createdAt: 1 });

    res.json(replies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTPComments = async (req, res) => {
  try {
    // Get all comments posted by students
    const comments = await Comment.find({ isReply: false })
      .populate('studentId', 'name email department')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (
      comment.studentId.toString() !== req.userId &&
      req.role !== 'tp'
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Comment.findByIdAndDelete(id);
    res.json({ success: true, message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
