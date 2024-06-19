import express from 'express';
import authenticationMiddleware from "../middleware/authenticationMiddleware";
import {
  registerUserHandler,
  loginUserHandler,
  getAllRegisteredUsersHandler,
  updateUserDetailsHandler,
  deleteUserByIdHandler
} from "../service/userAccount";
import {
  searchUserByNameHandler
} from "../service/userSearch";
import {
  followUserHandler
} from "../service/userFollow";

const router = express.Router();
router.use(express.json());

// User Account
router.post('/api/login', loginUserHandler);
router.post('/api/register', registerUserHandler);
router.get('/api/users', authenticationMiddleware.verifUser, getAllRegisteredUsersHandler);
router.put('/api/users/:userId', authenticationMiddleware.verifUser, updateUserDetailsHandler);
router.delete('/api/users/:userId', authenticationMiddleware.verifUser, deleteUserByIdHandler);

// User Search
router.get('/api/users/searchByName', authenticationMiddleware.verifUser, searchUserByNameHandler
);

// User Follow
router.post('/api/users/follow/:followedUserId', authenticationMiddleware.verifUser, followUserHandler);

export default router;