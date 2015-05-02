var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  name:   String,
  email:  String,
  githubId:  String
});

module.exports = mongoose.model('User', userSchema);