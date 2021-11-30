import mongoose from 'mongoose';

let listItemSchema = mongoose.Schema({
	'id': String,
	'api': String,
	'description': String,
	'auth': String,
	'https': Boolean,
	'cors': String,
	'category': String,
	'link': String,
	'favorite': Boolean,
	'saved': Boolean
});

export default mongoose.model('listItem', listItemSchema);
