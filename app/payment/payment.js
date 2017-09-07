app.directive('payment', [function(){
  return {
    scope: {
      request: '=',
      amount: '='
    },
    restrict: 'E',
    replace: true,
    templateUrl: 'payment/payment.html',
    controller: function($scope) {
      $scope.$watch('amount', function(newVal, oldVal){
        if($scope.request){
          $scope.request.Amount = newVal;
        }
      });

    }
  };
}]);
