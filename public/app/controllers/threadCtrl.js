angular.module('threadCtrl', ['threadService']).controller('threadController', ['$rootScope', '$location', '$routeParams', '$timeout', 'Thread', function ($rootScope, $location, $routeParams, $timeout, Thread) {
  var vm = this;
  
  vm.alerts = [];
  vm.closeAlert = function(index) {
    vm.alerts.splice(index, 1);
  };
  
  vm.processing = this;
  vm.activeTab = 'comments';
  vm.emptyComment = false;
  vm.newCommentCollapsed = true;
  
  vm.commentBody = '';
  vm.gistUrl = '';
  
  vm.submitComment = function(){
    if(vm.commentBody == '' || vm.commentBody.search(/\s*/) != 0){
      vm.alerts[0] = {msg: "Hey! You can't comment nothing!"};
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
    if(vm.gistUrl.search(/(https:\/\/gist.github.com\/)+\w*\/\w{20,20}$/i) != 0){
      vm.alerts[0] = {msg: "The link must be the complete url of the gist."};
      return;
    }
    
    var parsedUrl = vm.gistUrl.replace(/(https:\/\/gist.github.com\/)+\w*\//i, '');
    
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
  
  vm.deleteHack = function(){
    Thread.delete($routeParams.thread_id).success(function (data) {
      window.location = '/'; 
    });
  };
  
  vm.deleteComment = function(commentId){
    Thread.deleteComment(commentId).success(function (data) {
      window.location = '/thread/' + $routeParams.thread_id;
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
