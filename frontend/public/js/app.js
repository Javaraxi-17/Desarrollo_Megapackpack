var app = angular.module('clothesStore', ['ngRoute','clothesStore']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'public/partials/store.ejs',
    controller: 'StoreController'
  });
}]);
