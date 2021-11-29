import mongoose from 'mongoose';

let listItemSchema = mongoose.Schema({
	'list_id': String,
	'name': String,
	'note': String,
	'image': String,
	'url': String,
});

export default mongoose.model('listItem', listItemSchema);
