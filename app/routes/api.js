module.exports = function(app, express) {
  var apiRouter = express.Router();
  var User       = require('../models/user');
  var Post       = require('../models/post');

  apiRouter.get('/', function(req, res) {
    res.json({ message: 'Here be API' }); 
  });

  apiRouter.get('/posts', function(req, res){
    Post.find({}, function(err, posts){
      if(err) return res.send(err);
      res.json(posts);
    });
  });


  return apiRouter;
};