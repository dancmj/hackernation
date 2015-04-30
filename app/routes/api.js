var bodyParser = require('body-parser'); 
// var User       = require('../models/user');
var Post = require('../models/post')
var config     = require('../../config');

module.exports = function(app, express) {
  var apiRouter = express.Router();

  apiRouter.get('/', function(req, res) {
    res.json({ message: 'Here be API' }); 
  });

  apiRouter.get('/posts', function(req, res){
    Post.find({}, function(err, posts){
      if(err) {
        console.log(err);
        res.send(err);
      }
      res.json(posts);
    });
  });


  return apiRouter;
};