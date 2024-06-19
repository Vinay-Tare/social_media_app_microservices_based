import express from 'express';
import authenticationMiddleware from "../middleware/authenticationMiddleware";
import {
  createDiscussionHandler,
  updateDiscussionHandler,
  deleteDiscussionHandler,
  fetchViewsHandler
} from "../service/discussion";
import {
  searchDiscussionsByText,
  searchDiscussionsByTags
} from "../service/discussionSearch";

const router = express.Router();
router.use(express.json());

// Discussion
router.post('/api/discussions', authenticationMiddleware.verifyUser, createDiscussionHandler)
router.put('/api/discussions/:discussionId', authenticationMiddleware.verifyUser, updateDiscussionHandler)
router.delete('/api/discussions/:discussionId', authenticationMiddleware.verifyUser, deleteDiscussionHandler)
router.get('/api/discussions/:discussionId/views', authenticationMiddleware.verifyUser, fetchViewsHandler)

// Discussion Search
router.get('/api/discussions/searchByText', authenticationMiddleware.verifyUser, searchDiscussionsByText)
router.get('/api/discussions/searchByTags', authenticationMiddleware.verifyUser, searchDiscussionsByTags)


export default router;