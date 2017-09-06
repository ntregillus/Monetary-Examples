'use strict';

angular.module('myapp.receipt', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/receipt', {
    templateUrl: 'receipt/receipt.html',
    controller: 'ReceiptCtrl'
  });
}])

.controller('ReceiptCtrl', [function() {

}]);
