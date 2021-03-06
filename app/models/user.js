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
});

module.exports = mongoose.model('User', userSchema);