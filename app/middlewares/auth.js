module.exports = {
  isAuthenticated : isAuthenticated,
  isAdmin         : isAdmin
};

function isAuthenticated(req, res, next){ ///API needs authorized user.
  if(req.user){
    return next();
  }else{
    res.status(401).json({ message: "not authorized :(" })
  }
};

function isAdmin(req, res, next){
  if(req.isAuthenticated() && req.user.isAdmin){
    return next();
  }else{
    res.status(403).json({ message: "Forbidden, whoops."})
  }
};