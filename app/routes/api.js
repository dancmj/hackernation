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
  
//================= USERS =================
//=========================================
  
  apiRouter.route('/users').get( auth.isAdmin, function(req, res){
    User.find({}, function(err, users){
      if(err) return res.status(400).json(err);
      res.json(users);
    });
  });
  
  //======= GET USER_ID VARIABLE ======== MIDDLEWARE =======
  apiRouter.param('user_id', function( req, res, next, id){
    Thread.findById(req.params.user_id, function(err, userId){
      if(err){
        next(err);
      }else if(userId){
        req.userId = userId;
        next();
      }else{
        res.status(404).json({ message: " User not found :c "});
      }
    });
  });
  
  //========= USER FROM ID
  apiRouter.route('/users/:user_id').get( auth.isAdmin, function(req, res){
    User.findById(req.userId, function(err, user){
      if(err) return res.status(404).json(err);
      res.json(user);
    });
  });

//=============== THREADS =================
//=========================================
  apiRouter.route('/threads')
  .post(function(req, res){
    var thread = new Thread();
    
    thread.title = req.body.title;
    thread.body = req.body.body;
    thread.authorId = req.body.authorId;

    thread.save(function(err){
      if(err) return res.status(400).json(err);
      
      res.json({ message: 'Thread created!' , id: thread._id });
    });
  }).get(function(req, res){
    Thread.find().populate('authorId').exec(function(err, threads){
      if(err) return res.status(404).json(err);
      res.json(threads);
    });
  });
  
  //======= GET THREAD_ID VARIABLE ======== MIDDLEWARE =======
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
  
  //======= THREAD FROM ID
  apiRouter.route('/threads/:thread_id')
  .get(function(req, res){
      Thread.findById(req.threadId).populate('authorId').exec(req.threadId, function(err, thread){
        if(err) res.status(404).json(err);
        res.json(thread);
      });
  }).delete(function(req, res){
        
    Comment.find({ threadId: req.threadId }).remove(function(err){
      if(err) return res.status(404).json(err);
    });
    
    Thread.findByIdAndRemove( req.threadId, function(err){
      if(err) return res.status(404).json(err);
    });
    
    res.json({ message: 'Thread deleted!' }); 
  });;
  
//========== THREAD->COMMENTS =============
//=========================================
  apiRouter.route('/threads/:thread_id/comments')
  .post(function(req, res){
    var comment = new Comment();
    
    comment.body = req.body.body;
    comment.authorId = req.body.authorId;
    comment.threadId = req.threadId;
    comment.gistUrl = req.body.gistUrl;
    
    comment.save(function(err){
      if(err) res.status(400).json(err);
      
      res.json({ message: 'Comment posted!' , id: comment._id});
    });
  }).get(function(req, res){
    Comment.find({ threadId: req.threadId }).sort("-dateCreated").populate('authorId').exec( function(err, comments){
      if(err) return res.status(404).json(err);
      res.json(comments);
    });
  });
  
//=============== COMMENTS ================
//=========================================
  apiRouter.route('/comments')
  .post(function(req, res){
    var comment = new Comment();
    
    comment.body = req.body.body;
    comment.authorId = req.body.authorId;
    comment.threadId = req.body.threadId;
    
    comment.save(function(err){
      if(err) res.status(400).json(err);
      res.json({ message: 'Comment posted!' });
    });
  }).get(function(req, res){
    Comment.find().populate('authorId').exec( function(err, comments){
      if(err) return res.status(404).json(err);
      res.json(comments);
    });
  });
  
  //======= GET COMMENT_ID VARIABLE ======== MIDDLEWARE =======
  apiRouter.param('comment_id', function(req, res, next, id){
    Comment.findById(req.params.comment_id, function(err, commentId){
      if(err){
        next(err);
      }else if(commentId){
        req.commentId = commentId;
        next();
      }else{
        res.status(404).json({ message: " Comment not found :c "});
      }
    });
  });
  
  
  //======= COMMENT FROM ID =======
  apiRouter.route('/comments/:comment_id').get(function(req, res){
    Comment.findById( req.commentId, function(err, comment){
      if(err) return res.status(404).json(err);
      res.json(comment);
    });
  }).delete(function(req, res){
    Comment.findByIdAndRemove( req.commentId , function(err){
      if(err) return res.status(404).json(err);
      res.json({ message: 'Comment deleted!' }); 
    });
  });

  return apiRouter;
};