module.exports = function(passport){
  var User = require('../app/models/user');
  var GitHubStrategy = require('passport-github').Strategy;

  passport.use(new GitHubStrategy({
      clientID:     "ce61c490b75829101dff",
      clientSecret: "b46df7d24e8767cfb6de6ee9f3a10a8852024188",
      callbackURL:  "http://localhost:1337/oauth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ githubId: profile.id }, function (err, user) {
        if(err) return done(err); //connections
        if(!user){
          User.create(new User({
            githubId: profile.id,
            email:  profile.emails[0].value,
            name:   profile.displayName,
            username: profile.username
          }), function(err, newUser){
            if(err) return done(err)
            return done(err, newUser);
          })
        }else{
          return done(err, user);
        }
      });
    }
  ));

  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    User.findById(id, done);
  });

};