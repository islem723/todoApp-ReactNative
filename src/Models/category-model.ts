import mongoose, { Schema } from 'mongoose';

export default mongoose.model(
	'category',
	new Schema({
		name: {
			type: String,
			unique: true,
			required: true,
		},
		isEditable: {
			type: Boolean,
			required: false,
			default: true,
		},
		color: {
			type: Object,
			required: true,
		},
		icon: {
			type: Object,
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	})
);
