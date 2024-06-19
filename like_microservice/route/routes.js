import express from 'express';
import authenticationMiddleware from "../middleware/authenticationMiddleware";
import {
  createLikeHandler,
  deleteLikeHandler
} from "../service/like";

const router = express.Router();
router.use(express.json());

// Likes
router.post('/api/likes', authenticationMiddleware.verifyUser, createLikeHandler);
router.delete('/api/likes/:likeId', authenticationMiddleware.verifyUser, deleteLikeHandler);

export default router;