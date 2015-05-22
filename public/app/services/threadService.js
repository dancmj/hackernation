angular.module('threadService', []).factory('Thread', function($http){
  var threadFactory = {};
  
  threadFactory.get = function(id){
    return $http.get('/api/threads/' + id);
  };
  
  threadFactory.all = function(){
    return $http.get('/api/threads/');
  };
  
  threadFactory.create = function(threadData){
    return $http.post('/api/threads/', threadData);
  };
  
  threadFactory.delete = function(id){
    return $http.delete('/api/threads/' + id );
  };
  
  threadFactory.getComments = function(id){
    return $http.get('/api/threads/' + id + '/comments');
  };
  
  threadFactory.createComment = function(id, commentData){
    return $http.post('/api/threads/' + id +'/comments', commentData);
  };
  
  threadFactory.deleteComment = function(id){
    return $http.delete('/api/comments/' + id);
  };
  
  return threadFactory;
});