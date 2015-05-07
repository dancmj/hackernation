angular.module('authService', []).factory('Auth', function Auth($http) {
  var authFactory = {};
  
  authFactory.get = function(id){
    return $http.get('/oauth/session/');
  };
  
});