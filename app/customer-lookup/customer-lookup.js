app.directive('customerLookup', ['$http', '$timeout', function($http, $timeout){
  return {
    scope: {
      customerId: '=',
      mode: '='
    },
    restrict: 'E',
    replace: true,
    templateUrl: 'customer-lookup/customer-lookup.html',
    controller: function($scope) {
      $scope.hasError = false;
      var getCustomerID = function(searchValue){
        $scope.customerId = null;
        var url = 'https://engage-cert.monetary.co/V1/Customers?' + $scope.mode + "=" + searchValue;
        $http({
          method: 'GET',
          url: url,
          headers: {'Authorization': 'cert_secretEW78GYG0AMTX'}
        }).then(function(response){
          $scope.customerId = null;
          if(response.data && response.data.length > 0){
            $scope.customerId = response.data[0].CustomerID;
            $scope.hasError = false;
          }

        }, function(response){
          $scope.customerId = null;
          $scope.hasError = true;
        });
      };
      $scope.$watch('searchValue', function(newVal, oldVal){
        var valueBeforeTimeout = newVal;
        $timeout(function(){
          var minLength = 3;
          if ($scope.mode == 'Phone'){
            minLength = 10;
          }
          if($scope.searchValue && $scope.searchValue.length >= minLength &&  valueBeforeTimeout == $scope.searchValue){
              getCustomerID($scope.searchValue);
          }else if($scope.searchValue == ''){
            $scope.customerId = null;
          }
        }, 10);
      });
    }
  };
}]);
