'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
//  'ngSanitize',
  'ui.bootstrap',

  'myApp.home',
  'myApp.register-customer',
  'myApp.search-customers',
  'myApp.offers',
  'myApp.purchase',
  'myapp.receipt',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home'});
}]);

app.filter('fallback', function() {
    return function val(el, fallback) {
        if (!String.prototype.trim) {
            String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
        }

        if (el && el.toString().trim() != "") {
            return el;
        } else {
            return fallback;
        }
    }
});
