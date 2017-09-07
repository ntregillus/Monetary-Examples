app.directive('discountBuilder', ['$http', '$timeout', function($http, $timeout){
  return {
    scope: {
      customerId: '=',
      mode: '=',
      receipt: '='
    },
    restrict: 'E',
    replace: true,
    templateUrl: 'discount-builder/discount-builder.html',
    controller: function($scope) {
      $scope.discountSummaries = [];
      $scope.adhocDiscount = {amount:''};
      $scope.$watch('customerId', function(newVal, oldVal){
        if(!$scope.customerId){
          $scope.discountSummaries = [];
          return;
        }
        $http({
          method: 'GET',
          url: 'https://engage-cert.monetary.co/V1/Customers/'
                + $scope.customerId + '/Offers',
          headers:{'Authorization': 'cert_secretEW78GYG0AMTX'}
        }).then(function(response){
          $scope.receipt.Discounts = [];
          $scope.discountSummaries = response.data.map(function(discount){
            var result ={
              text: 'Adhoc Reward',
              amount: 0,
              offerID: discount.OfferID,
              minPurchase: discount.MinimumPurchase,
              selected: false
            };
            if(discount.DiscountAmount){
              result.text = "$" + discount.DiscountAmount + " off";
              result.amount = discount.DiscountAmount;
            }
            else if(discount.DiscountPercent){
              result.text = discount.DiscountPercent + "% off";
              //this amount will adjust based upon SubTotal changes
              result.Amount = receipt.SubTotal * (discount.DiscountPercent/100);
              result.percent = (discount.DiscountPercent/100);
            }else if(discount.PosCode){
              result.text = discount.PosCodeRewardDescription + "($10 off)";
              result.amount = 10;
            }else if(discount.RewardSku){
              result.text = "Free " + discount.RewardSkuDescription;
              result.amount = 5;
              result.sku = discount.Sku;
              result.skuDescription = discount.RewardSkuDescription;
            }
            return result;
          });
        }, function(response){
          console.log(response);
          $scope.discountSummaries = [];
        });
      });
      //end of watch
      $scope.addDiscount = function(){
        var text = $scope.adhocDiscount.text || '$' + $scope.adhocDiscount.amount + ' off';
        var item = {
            amount: $scope.adhocDiscount.amount,
            text: text,
            selected: true
        };
        $scope.discountSummaries.push(item);
        $scope.discountSelected(item);
      };

      $scope.discountSelected = function(discount){
        if(!$scope.receipt.Discounts){
          $scope.receipt.Discounts = [];
        }
        if(discount.selected){
          $scope.receipt.Discounts.push({
            OfferID: discount.offerID,
            Description: discount.text,
            Amount: discount.amount * -1
          });
        }else{
          var filterCondition = function(item){
            return (item.OfferID != discount.offerID
                  && item.Description != item.text);
          };
          $scope.receipt.Discounts = $scope.receipt
          .Discounts.filter(filterCondition);
        }
      }
    }
  };
}]);
