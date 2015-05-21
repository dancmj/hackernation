angular.module('homeCtrl', ['threadService']).controller('homeController', ['$rootScope', '$location', '$timeout', 'Thread', function ($rootScope, $location, $timeout, Thread) {
  var vm = this;
  
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
      vm.processingPost = true;
       $location.path('/thread/' + data.id);
    });
  }
  
  Thread.all().success(function (data) {
    vm.processing = false;
    vm.threads = data;
  });

}]);