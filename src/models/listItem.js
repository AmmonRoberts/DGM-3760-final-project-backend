import mongoose from 'mongoose';

let listItemSchema = mongoose.Schema({
	'API': { type: String, required: true },
	'Description': { type: String, required: true },
	'Auth': { type: String },
	'HTTPS': { type: Boolean, required: true },
	'CORS': { type: String, required: true },
	'Category': { type: String, required: true },
	'Link': { type: String, required: true },
	'favoriteList': { type: Boolean, required: true },
	'saved': { type: Boolean, required: true }
});

export default mongoose.model('listItem', listItemSchema);
