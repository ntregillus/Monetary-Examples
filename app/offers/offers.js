'use strict';

angular.module('myApp.offers', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/offers', {
    templateUrl: 'offers/offers.html',
    controller: 'OffersCtrl'
  });
}])

.controller('OffersCtrl', [function() {
}]);
