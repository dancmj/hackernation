angular.module('threadCtrl', ['threadService']).controller('threadController', ['$rootScope', '$location', '$routeParams', 'Thread', function($rootScope, $location, $routeParams, Thread){
  var vm = this;
  vm.processing = this;


  Thread.get($routeParams.thread_id).success(function(data){
    vm.processing = false;
    vm.info = data;
  });
}]);