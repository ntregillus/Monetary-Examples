'use strict';

angular.module('myApp.purchase', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/purchase', {
    templateUrl: 'purchase/purchase.html',
    controller: 'PurchaseCtrl'
  });
}])

.controller('PurchaseCtrl', ['$scope','$http', function($scope, $http) {
    $scope.mode = 'Purchase';
    $scope.method = 'POST';
    $scope.purchase = {
      Skus: [],
      Discounts: [],
      SubTotal: 0,
      Taxes: 0,
      Total: 0
    };
    $scope.$watch('mode', function(newVal, oldVal){
      $scope.method = "POST";
      $scope.request = {};
      $scope.response = null;
      switch (newVal) {
        case 'Purchase':
          $scope.url = 'https://pay-cert.monetary.co/v1/credit/sale/';
          break;
        case 'Receipt':
          $scope.url = "https://engage-cert.monetary.co/V1/Receipts";
          $scope.request = $scope.purchase;
          break;
      }
    });
    $scope.calcTotals = function(){
      var subTotal = 0;
      for(var i = 0; i < $scope.purchase.Skus.length; i++){
        var s = $scope.purchase.Skus[i];
        var quantity = s.Quantity||1;
        subTotal += (quantity*s.Amount);
      }
      for(var i = 0; i < $scope.purchase.Discounts.length; i++){
        var d = $scope.purchase.Discounts[i];
        subTotal += (d.Amount); //add since amount is always negative!
      }
      $scope.purchase.SubTotal = subTotal;
      $scope.purchase.Taxes = subTotal * 0.079;
      $scope.purchase.Total = subTotal * 1.079;

    };
    $scope.$watch('purchase.Skus', function(newVal, oldVal){
      $scope.calcTotals();
    }, true);
    $scope.$watch('purchase.Discounts', function(newVal, oldVal){
      $scope.calcTotals();
    }, true);

    $scope.submit = function(){
      $scope.response = {'Status': 'Processing Request...'};
      $scope.statusCode = '';
        $http({
          method: $scope.method,
          url: $scope.url,
          data: $scope.request,
          headers: {
            'Authorization': 'cert_secretEW78GYG0AMTX'
          }
        }).then(function(response){
            $scope.statusCode = response.status;
            $scope.response = $scope.data;
        }, function(response){
          $scope.statusCode = response.status;
          $scope.response = response.data || 'no content';
        });
    };
}]);
