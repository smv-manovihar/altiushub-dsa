import { Router } from 'express';
import {
	getUserById,
	changeUserPassword,
	updateUserDetails,
} from '../controllers/user.controller.js';
import { getTodos } from '../controllers/todo.controller.js';

const router = Router();

router.get('/:id', getUserById);
router.get('/:id/todos', getTodos);
router.post('/change-password', changeUserPassword);
router.post('/update-details', updateUserDetails);

export default router;
