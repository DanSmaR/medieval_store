import express from 'express';
import { UsersController } from '../controllers';

const router = express.Router();

const usersController = new UsersController();

router.route('/')
  .post(usersController.createUser);

export default router;
