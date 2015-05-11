angular.module('threadCtrl', ['threadService']).controller('threadController', ['$rootScope', '$location', '$routeParams', '$timeout', 'Thread', function ($rootScope, $location, $routeParams, $timeout, Thread) {
  var vm = this;
  vm.processing = this;
  vm.activeTab = 'comments';
  vm.emptyComment = false;
  vm.newCommentCollapsed = true;
  
  vm.commentBody = '';
  vm.gistUrl = '';
  
  vm.submitComment = function(){
    if(vm.commentBody == ''){
      vm.emptyComment = true;
      return;
    }
    
    var commentInfo = {
      body: vm.commentBody,
      authorId: $rootScope.user._id
    };
    
    Thread.createComment($routeParams.thread_id, commentInfo).success(function(data){
      $timeout(function(){
        window.location = '/thread/' + $routeParams.thread_id;  
      }, 1000);
    });
  };
  
  vm.submitSolution = function(){
    console.log(vm.gistUrl.search(/(https:\/\/gist.github.com\/)+\w*\/\w{20,20}$/i))
    if(vm.gistUrl.search(/(https:\/\/gist.github.com\/)+\w*\/\w{20,20}$/i) != 0){
      return;
    }
    
    var parsedUrl = vm.gistUrl.replace(/(https:\/\/gist.github.com\/)+\w*\//i, '');
    console.log(parsedUrl);
    var commentInfo = {
      gistUrl: parsedUrl,
      authorId: $rootScope.user._id
    };
    
    Thread.createComment($routeParams.thread_id, commentInfo).success(function(data){
      $timeout(function(){
        window.location = '/thread/' + $routeParams.thread_id;  
      }, 1000);
    });
  };
  
  Thread.get($routeParams.thread_id).success(function (data) {
    vm.processing = false;
    vm.info = data;
  });

  Thread.getComments($routeParams.thread_id).success(function (data) {
    vm.comments = data;
  });
}]);