angular.module('mainCtrl', ['authService']).controller('mainController', ['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
  var vm = this;

  Auth.get().success(function (data) {
    $rootScope.user = data;
  });
  
  vm.login = function(){
    window.location = '/oauth/github';
  };

  vm.logout = function () {
    Auth.logout().success(function (data) {
      $rootScope.user = null;
      window.location = '/';
    });
  };

  vm.getDate = function(date){
    var parsedDate = new Date(date);
    return parsedDate.toDateString()
  };


}]);