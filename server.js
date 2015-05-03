//======================={PACKAGES}======================
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
//====================================================-->
//====================={APP.CONFIG}======================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//====================================================-->
//======================{APP.CORS}=======================
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});
//====================================================-->
// log all requests to the console 
app.use(morgan('dev'));
app.use(cookieParser()); //Read cookies



//====================={MONGOOSE}========================
mongoose.connect(db.database); 
require('./config/passport')(passport)
//====================================================-->
//====================={PASSPORT}========================
app.use(session({secret: 'allyourbasearebelongtous'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//====================================================-->

app.use(express.static(__dirname + '/public')); //Setup default dir for public, express
require('./app/routes')(app, express, passport); //Call index.js for node routes.

// START THE SERVER
// ====================================
app.listen(db.port);
console.log("")
console.log("            •        Please hack")
console.log("              •       on sector")
console.log("          • • •         " + db.port)
console.log("")

