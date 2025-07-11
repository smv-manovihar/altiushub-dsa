import { Router } from 'express';
import {
	createTodo,
	deleteCompleted,
	deleteTodo,
	getTodoById,
	getTodos,
	markAsCompleted,
	updateTodoById,
} from '../controllers/todo.controller.js';

const router = Router();

router.get('/', getTodos);
router.post('/create', createTodo);
router.get('/:id', getTodoById);
router.put('/:id', updateTodoById);
router.delete('/:id', deleteTodo);
router.delete('/completed', deleteCompleted);
router.put('/complete/:id', markAsCompleted);

export default router;
