import express from 'express';
import authenticationMiddleware from "../middleware/authenticationMiddleware";
import {
  createCommentHandler,
  updateCommentHandler,
  deleteCommentHandler,
  replyToCommentHandler
} from "../service/comment";

const router = express.Router();

// Comments
router.use(express.json());
router.post('/api/comment', authenticationMiddleware.verifyUser, createCommentHandler);
router.put('/api/comment/:id', authenticationMiddleware.verifyUser, updateCommentHandler);
router.delete('/api/comment/:id', authenticationMiddleware.verifyUser, deleteCommentHandler);
router.post('/api/comment/:commentId/reply', authenticationMiddleware.verifyUser, replyToCommentHandler);

export default router;