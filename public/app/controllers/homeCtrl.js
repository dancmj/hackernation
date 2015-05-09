angular.module('homeCtrl', ['threadService']).controller('homeController', ['$rootScope', '$location', 'Thread', function ($rootScope, $location, Thread) {
  var vm = this;
  vm.processing = this;

  Thread.all().success(function (data) {
    vm.processing = false;
    vm.threads = data;
  });

}]);