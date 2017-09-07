'use strict';

angular.module('myApp.register-customer', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register-customer', {
    templateUrl: 'register-customer/register-customer.html',
    controller: 'RegisterCustomerCtrl'
  });
}])

.controller('RegisterCustomerCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.request = {};
  $scope.url = 'https://engage-cert.monetary.co/V1/Customers';
  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(1970, 1, 1),
    startingDay: 1
  };
  $scope.submitRequest = function() {
    $scope.response = {'Status': 'Processing Request...'};
    $scope.statusCode = '';

    $http({
      method:'POST',
      url: $scope.url,
      data: $scope.request,
      headers: {
        'Authorization': 'cert_secretEW78GYG0AMTX'
      },
    }).then(function(response){
      $scope.response = response.data;
      $scope.statusCode = response.status;
    }, function(response){
      $scope.response = response.data;
      $scope.statusCode = response.status;
    });
  };
}]);
