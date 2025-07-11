import { Schema, model } from 'mongoose';

const TodoSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'Users',
			required: true,
			index: true,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		isCompleted: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{ timestamps: true },
);

const Todo = model('Todos', TodoSchema, 'Todos');

export default Todo;
