import mongoose from 'mongoose';

let listItemSchema = mongoose.Schema({
	'id': { type: String },
	'api': { type: String, required: true },
	'description': { type: String, required: true },
	'auth': { type: String },
	'https': { type: Boolean, required: true },
	'cors': { type: String, required: true },
	'category': { type: String, required: true },
	'link': { type: String, required: true },
	'favorite': { type: Boolean, required: true },
	'saved': { type: Boolean, required: true }
});

export default mongoose.model('listItem', listItemSchema);
