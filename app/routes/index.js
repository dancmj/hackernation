module.exports = function(app, express, passport){
  var apiRoutes = require('./api')(app, express);
  app.use('/api', apiRoutes);
  
  var oauthRoutes = require('./oauth')(app, express, passport);
  app.use('/oauth', oauthRoutes);
  
  var path = require('path');
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname , '../../public/app/views/index.html'));
  });
};