app.directive('requestViewer', [function(){
  return {
    scope: {
      requestData: '=?',
      url: '=',
      method: '=',
      //response
      statusCode: '=',
      responseData: '='
    },
    restrict: 'E',
    replace: true,
    templateUrl: 'request-viewer/request-viewer.html',
    link: function($scope, element, attrs) {
        $scope.requestHeader = "Request " + $scope.method + " " + $scope.url;
    }
  };
}]);
