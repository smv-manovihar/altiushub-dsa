import Todo from '../models/todo.model.js';

export const createTodo = async (req, res) => {
	const userId = req.userId;
	const { title, description, isCompleted } = req.body;
	if (!title || !description) {
		return res.status(400).json({
			message: 'Both title and description are required',
		});
	}
	try {
		const newTodo = new Todo({
			userId,
			title,
			description,
			isCompleted,
		});

		await newTodo.save();

		res
			.status(201)
			.json({ message: 'Todo created successfully', todo: newTodo });
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Server error',
		});
	}
};

export const getTodos = async (req, res) => {
	const userId = req.userId;
	try {
		const todos = await Todo.find({ userId });
		return res.status(200).json({ message: 'Success', todos });
	} catch (e) {
		res.status(500).json({ message: 'Server Error' });
	}
};
export const getTodoById = async (req, res) => {
	const userId = req.userId;
	const { id } = req.params;
	try {
		const todo = await Todo.findById(id);
		res.status(200).json({ message: 'Todo found', todo });
	} catch (err) {
		res.status(500).json({ message: 'Server Error' });
	}
};
export const updateTodoById = async (req, res) => {
	const userId = req.userId;
	const { id } = req.params;
	const { data } = req.body;
	try {
		const todo = await Todo.findById(id);
		if (!todo) {
			return res.status(404).json({ message: 'Todo not found' });
		}
		const updatedTodo = Todo.updateOne(
			{ _id: id, userId },
			{ $set: { ...data } },
		);
		if (!updatedTodo) {
			return res.status(400).json({
				message: 'Not updated',
			});
		}
		const updated = await Todo.findById(id);
		res.status(200).json({ message: 'Updated successfully', todo: updated });
	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
};

export const deleteTodo = async (req, res) => {
	const userId = req.userId;
	const { id } = req.params;
	try {
		const todo = await Todo.findById(id);
		if (!todo) {
			return res.status(404).json({ message: 'Not found' });
		}
		const deleted = await Todo.deleteOne({ _id: id, userId });
		if (!deleted) {
			return res.status(400).json({ message: 'Not done' });
		}
		res.status(200).json({ message: 'Deleted' });
	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
};

export const deleteCompleted = async (req, res) => {
	const userId = req.userId;
	const { id } = req.params;
	try {
		const todo = await Todo.findById(id);
		if (!todo) {
			return res.status(404);
		}
		const deleted = await Todo.deleteMany({ userId, isCompleted: true });
		if (deleted.length == 0) {
			res.status(400);
		}
		return res.status(200);
	} catch (err) {
		res.status(500);
	}
};

export const markAsCompleted = async (req, res) => {
	const userId = req.userId;
	const { id } = req.params;
	try {
		const todo = Todo.find({ _id: id, userId });
		if (!todo) {
			return res.status(404).json({ message: 'Not found' });
		}

		todo.isCompleted = true;
		await todo.save();

		res.status(200).json({ message: 'Marked as completed', todo });
	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
};
