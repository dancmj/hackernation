var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//User Schema
var userSchema = new Schema({
  username: String,
  name:   String,
  email:  String,
  githubId:  String,
  githubUrl: String,
  gravatarUrl: String,
  isAdmin: { type : Boolean, default: false },
  creationDate: { type : Date, default: Date.now },
  comments:   [{ type: Schema.ObjectId, ref: 'Comment' }],
  threads:    [{ type: Schema.ObjectId, ref: 'Thread' }],
});

module.exports = mongoose.model('User', userSchema);