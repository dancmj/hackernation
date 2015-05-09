angular.module('mainCtrl', ['authService']).controller('mainController', ['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
  var vm = this;

  Auth.get().success(function (data) {
    vm.user = data;
  });
  
  vm.login = function(){
    window.location = '/oauth/github';
  };

  vm.logout = function () {
    Auth.logout().success(function (data) {
      vm.user = null;
      window.location = '/';
    });
  };



}]);