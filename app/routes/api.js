module.exports = function(app, express) {
  var apiRouter  = express.Router();
  var auth       = require('../middlewares/auth');
  var User       = require('../models/user');
  var Thread     = require('../models/thread');
  var Comment    = require('../models/comment');

  //apiRouter.use('/*', auth.isAdmin);

  apiRouter.get('/', function(req, res) {
    res.json({ message: 'Here be API' }); 
  });
  
  apiRouter.route('/users').get(auth.isAuthenticated ,function(req, res){
    User.find({}, function(err, users){
      if(err) return res.send(err);
      res.json(users);
    });
  });
  
  //TODO, ADD GET THREADS & COMMENTS FROM USER
  apiRouter.route('/users/:user_id').get(function(req, res){
    User.findById(req.params.user_id, function(err, user){
      if(err) res.send(err);
      res.json(user);
    });
  });

  apiRouter.route('/threads')
  .post(function(req, res){
    var thread = new Thread();
    
    thread.title = req.body.title;
    thread.body = req.body.body;
    thread.authorId = req.body.authorId;

    thread.save(function(err){
      if(err){
        if(err.code == 11000){
          return res.json({ success: false, message: 'A thread with that title already exists.' });
        }else{
          res.send(err);
        }
      } 
      res.json({ message: 'Thread created!' });
    });
  }).get(function(req, res){
    Thread.find().populate('authorId').exec(function(err, threads){
//    Thread.find({}, function(err, threads){
      if(err) return res.send(err);
      res.json(threads);
    });
  });
  
  //TODO CHANGE TO AN ACTUAL MIDDLEWARE :D
  apiRouter.param('thread_id', function(req, res, next, id){
    Thread.findById(req.params.thread_id, function(err, threadId){
      if(err){
        next(err);
      }else if(threadId){
        req.threadId = threadId;
        next();
      }else{
        res.status(404).json({ message: " Thread not found :c "});
      }
    });
  });
  
  //TODO, ADD PUT ROUTE.
  apiRouter.route('/threads/:thread_id')
  .get(function(req, res){
      Thread.findById(req.threadId).populate('authorId').exec(req.threadId, function(err, thread){
        if(err) res.send(err);
        res.json(thread);
      });
  });
  
  apiRouter.route('/threads/:thread_id/comments')
  .get(function(req, res){
    Comment.find({ threadId: req.threadId }, function(err, comments){
      if(err) return res.send(err);
      res.json(comments);
    });
  });
  
  apiRouter.route('/comments')
  .post(function(req, res){
    var comment = new Comment();
    
    comment.body = req.body.body;
    comment.authorId = req.body.authorId;
    comment.threadId = req.body.threadId;
    
    comment.save(function(err){
      if(err) res.send(err);
      res.json({ message: 'Comment posted!' });
    });
  }).get(function(req, res){
    Comment.find().populate('authorId').exec( function(err, comments){
      if(err) return res.send(err);
      res.json(comments);
    });
  });
  
  //TODO, ADD PUT ROUTE.
  apiRouter.route('/comments/:comment_id')
  .get(function(req, res){
    Comment.findById(req.params.comment_id, function(err, comment){
      if(err) res.send(err);
      res.json(comment);
    });
  });

  return apiRouter;
};