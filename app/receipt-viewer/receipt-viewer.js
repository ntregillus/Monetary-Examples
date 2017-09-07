app.directive('receiptViewer', [function(){
  return {
    scope: {
      receipt: '='
    },
    restrict: 'E',
    replace: true,
    templateUrl: 'receipt-viewer/receipt-viewer.html',
    link: function($scope, $element, attrs) {}
  };
}]);
