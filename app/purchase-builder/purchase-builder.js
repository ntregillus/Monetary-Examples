app.directive('purchaseBuilder', [function(){
  return {
    scope: {
      purchase: '=',
      addSku: '=?'
    },
    restrict: 'E',
    replace: true,
    templateUrl: 'purchase-builder/purchase-builder.html',
    controller: function($scope, $element) {
      $scope.purchase = $scope.purchase || {
        Skus: [],
        Discounts: [],
        SubTotal: 0,
        Taxes: 0,
        Total: 0
      };
      var lookup = {
        'Shampoo': 'Head & Shoulders 20 oz bottle',
        'Bar-O-Soap': 'Irish Spring single bar',
        'Hair-Jell': 'Swave Super hold 3 oz bottle',
        'Color-Red': 'Hair dye: red 3 oz bottle',
        'Color-Yellow': 'Hair dye: yellow 3 oz bottle',
        'Color-Green': 'Hair dye: green 3 oz bottle',
      };
      var callback = $scope.addSku || function(newSku){};
      $scope.addSku = function(sku){
        var description = lookup[sku];
        var existingSku = $scope.purchase.Skus.find(function(item){
          return item.Sku == sku;
        });
        if (existingSku){
          existingSku.Quantity += 1;
        }else{
          var newSku = {
            Sku: sku,
            SkuDescription: description,
            Quantity: 1,
            Amount: 10
          };
          $scope.purchase.Skus.push(newSku);
          callback(newSku);
        }
      }
    }
  };
}]);
