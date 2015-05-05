angular.module('threadService', []).factory('Thread', function($http){
  var threadFactory = {};
  
  threadFactory.get = function(id){
    return $http.get('/api/threads/' + id);
  };
  
  threadFactory.all = function(){
    return $http.get('/api/threads/');
  };
  
  threadFactory.create = function(threadData){
    return $http.put('/api/threads/', threadData);
  };
  
  return threadFactory;
});