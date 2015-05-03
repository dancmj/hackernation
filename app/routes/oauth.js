module.exports = function (app, express, passport) {
  var oauthRouter = express.Router();

  oauthRouter.get('/github', //redirect to github
    passport.authenticate('github')), 
    function (req, res) {
      //request redirected to github, this won't be called.
    };

  oauthRouter.get('/github/callback', //authenticate the request, redirect if fails
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
      res.redirect('/');
    });

  oauthRouter.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  return oauthRouter;
};