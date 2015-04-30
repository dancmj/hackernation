var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//Post Schema
var postSchema = new Schema({
  title: String,
  body: String,
  postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  dateCreated: Date,
  comments: [{body:"string", by: mongoose.Schema.Types.ObjectId}]
});

module.exports = mongoose.model('Post', postSchema);