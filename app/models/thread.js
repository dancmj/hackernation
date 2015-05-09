var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//Thread Schema
var threadSchema = new Schema({
  title:       { type: String, required: true, index: { unique: true }},
  body:        { type: String, required: true},
  dateCreated: { type: Date, default: Date.now },
  dateEdited:  { type: Date, default: null },
  authorId:    { type: Schema.ObjectId, ref: 'User' }, //Types!
  comments:   [{ type: Schema.ObjectId, ref: 'Comment' }],
//  solutions:  [{ type: Schema.ObjectId, ref: 'Solution' }]
});

module.exports = mongoose.model('Thread', threadSchema);