// CALL PACKAGES!
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var db          = require('./config/db.js');
var path        = require('path');

var passport    = require('passport');
var flash       = require('connect-flash');
var session     = require('express-session');
var cookieParser = require('cookie-parser');

// APP CONFIG====================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

// log all requests to the console 
app.use(morgan('dev'));
app.use(cookieParser()); //Read cookies

app.set('view engine', 'ejs');

// connect to our database
mongoose.connect(db.database); 
require('./config/passport')(passport)

app.use(session({secret: 'allyourbasearebelongtous'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

// ROUTES FOR OUR API =================
// ====================================
// require('./app/routes',app, express, passport)
// API/OAUTH ROUTES ------------------------
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);
var oauthRoutes = require('./app/routes/oauth')(app, express, passport);
app.use('/oauth', oauthRoutes);

///-----
app.get('/', isAuthenticated, function(req, res){
    res.send(req.user.name)
});
/// ----

function isAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else{
    res.status(401).json({ message: "not authorized :(" })
  }
};

// MAIN CATCHALL ROUTE --------------- 
// SEND USERS TO FRONTEND ------------
// has to be registered after API ROUTES
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// START THE SERVER
// ====================================
app.listen(db.port);
console.log('Please hack on harbor ' + db.port + ', gracias.');


