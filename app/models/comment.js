var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Comment Schema
var commentSchema = new Schema({
	body: String,
	dateCreated: { type : Date, default : Date.now },
	dateEdited: { type : Date, default : null },
  threadId: { type : Schema.ObjectId, ref : 'Thread', required: true },
  authorId: { type : Schema.ObjectId, ref : 'User', required: true }
});

module.exports = mongoose.model('Comment', commentSchema);