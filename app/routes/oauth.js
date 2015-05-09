module.exports = function (app, express, passport) {
  var oauthRouter = express.Router();
  var auth       = require('../middlewares/auth');
  
  oauthRouter.get('/session', function(req, res){
    res.json(req.user);
  });

  oauthRouter.get('/github', //redirect to github
    passport.authenticate('github')), 
    function (req, res) {
      //request redirected to github, this won't be called.
    };

  oauthRouter.get('/github/callback', //authenticate the request, redirect if fails
    passport.authenticate('github', { failureRedirect: '/' }),
    function (req, res) {
      res.redirect('/');
    });

  oauthRouter.get('/logout', function (req, res) {
    if(req.user) {
      req.logout();
      res.send(200);
    } else {
      res.send(400, "Not logged in");
    }
  });

  return oauthRouter;
};