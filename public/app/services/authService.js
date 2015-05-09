angular.module('authService', []).factory('Auth', function ($http) {
  var authFactory = {};
  
  authFactory.get = function(){
    return $http.get('/oauth/session/');
  };
  
  return authFactory;
});