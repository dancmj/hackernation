angular.module('homeCtrl', ['threadService']).controller('homeController', ['$rootScope', '$location', '$timeout', 'Thread', function ($rootScope, $location, $timeout, Thread) {
  var vm = this;
  
  vm.alerts = [];
  
  vm.processing = this;
  vm.processingPost = false;
  vm.newThreadCollapsed = true;
  vm.titleEmpty = false;
  vm.bodyEmpty = false;
  
  vm.hackDescription = "";
  vm.hackTitle = "";

  vm.submitHack = function(){
    if(vm.hackTitle == ""){
      vm.titleEmpty = true;
      return;
    }
    if(vm.hackDescription == ""){
      vm.descriptionEmpty = true;
      return;
    }
    
    var threadInfo = {
      title: vm.hackTitle,
      body: vm.hackDescription,
      authorId: $rootScope.user._id
    };

    Thread.create(threadInfo).success(function(data){
      vm.processingPost = false;
      $location.path('/thread/' + data.id)
    }).error(function(status){
      vm.processingPost = false;
      vm.alerts.push({ msg: 'Thread name already exists!' });
    });
  };
  
  Thread.all().success(function (data) {
    vm.processing = false;
    vm.threads = data;
  }).error(function(status){
    vm.processing = false;
    vm.alerts.push({ msg: 'Couldn\'t find any threads :c.' }); 
  });

   vm.closeAlert = function(index) {
//    vm.alerts.splice(index, 1);
    vm.alerts.splice(0, 1);
  };

}]);