var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//Post Schema
var postSchema = new Schema({
  title:      String,
  body:       String,
  postedBy:   {type: Schema.ObjectId, ref: 'User'}, //Types!
  dateCreated: Date,
  replies:   [{body:"string", by: Schema.ObjectId}]
});

module.exports = mongoose.model('Post', postSchema);