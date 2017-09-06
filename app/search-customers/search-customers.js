'use strict';

angular.module('myApp.search-customers', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search-customers', {
    templateUrl: 'search-customers/search-customers.html',
    controller: 'SearchCustomersCtrl'
  });
}])

.controller('SearchCustomersCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.filters = [];
    $scope.url = 'https://engage-cert.monetary.co/V1/Customers?'
    $scope.$watch('filters', function(){
      var url = 'https://engage-cert.monetary.co/V1/Customers?';
      for(var i = 0; i < $scope.filters.length; i++){
        if(i != 0){
          url += '&';
        }
        var filter = $scope.filters[i];
        url += filter.field + '=' + filter.value;
      }
      $scope.url = url;
      $scope.response = null;
      $scope.results = [];
    }, true);
    $scope.addFilter = function(){
      $scope.filters.push({field:'firstName', value:''});
    };
    $scope.removeFilter = function(index){
       $scope.filters.splice(index, 1);
    };
    $scope.submitSearch = function() {
      $scope.response = {'Status': 'Processing Request...'};
      $scope.statusCode = '';
      $http({
        method:'GET',
        url: $scope.url,
        headers: {
          'Authorization': 'cert_secretEW78GYG0AMTX'
        }
      }).then(function(response){
        $scope.response = response.data;
        $scope.statusCode = response.status;
        $scope.results = response.data;
      }, function(response){
        $scope.response = response.data;
        $scope.statusCode = response.status;
        $scope.results = [];
      });

    };
    $scope.getOffers = function(customerID) {
      $scope.url = 'https://engage-cert.monetary.co/V1/Customers/' + customerID + '/Offers';
      $scope.method = 'Get';
      $scope.response = {'Status': 'Processing Request...'};
      $http({
        method:'GET',
        url: $scope.url,
        headers: {
          'Authorization': 'cert_secretEW78GYG0AMTX'
        }
      }).then(function(response){
        $scope.response = response.data;
        $scope.statusCode = response.status;
      }, function(response){
        $scope.response = response.data;
        $scope.statusCode = response.status;
      });
    };
    $scope.getPunchCards = function(customerID) {
      $scope.url = 'https://engage-cert.monetary.co/V1/Customers/' + customerID + '/PunchCards';
      $scope.method = 'Get';
      $scope.response = {'Status': 'Processing Request...'};
      $http({
        method:'GET',
        url: $scope.url,
        headers: {
          'Authorization': 'cert_secretEW78GYG0AMTX'
        }
      }).then(function(response){
        $scope.response = response.data;
        $scope.statusCode = response.status;
      }, function(response){
        $scope.response = response.data;
        $scope.statusCode = response.status;
      });
    };
}]);
