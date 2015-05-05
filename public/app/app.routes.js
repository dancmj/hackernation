angular.module('app.routes', ['ngRoute']).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider.when('/', { //MAIN CONTROLLER
    templateUrl: 'app/views/pages/home.html',
    controller: 'homeController',
    controllerAs: 'home'
  })
  .when('/thread/:thread_id', { //THREAD CONTROLLER
    templateUrl: 'app/views/pages/thread.html',
    controller: 'threadCtrl',
    controllerAs: 'thread'
  });
  
  $locationProvider.html5Mode(true);
}]);