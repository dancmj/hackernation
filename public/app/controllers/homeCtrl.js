angular.module('homeCtrl', ['threadService']).controller('homeController', ['$rootScope', '$location', 'Thread', function ($rootScope, $location, Thread) {
  var vm = this;
  
  vm.processing = this;
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
    console.log(threadInfo);
    Thread.create(threadInfo).success(function(data){
      console.log(data);
//      $location.path('/data')
    });
  }
  
  Thread.all().success(function (data) {
    vm.processing = false;
    vm.threads = data;
  });

}]);