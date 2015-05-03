var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Solution Schema
var solutionSchema = new Schema({
	body: String,
  gistUrl: String,
	dateCreated: { type : Date, default: Date.now },
	dateEdited: { type : Date, default: null },
  authorId: { type: Schema.ObjectId, ref: 'User', required: true }
//  replies: [{type: Schema.ObjectId, ref: 'Comment'}]
});

module.exports = mongoose.model('Solution', solutionSchema);