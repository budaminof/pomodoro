// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', [
  'ionic',
  'ngCordova',
  'ngAnimate',
  'angularMoment',
  'angular.filter',
  'chart.js',
  'angular-svg-round-progressbar',
  'app.controllers',
  'app.routes',
  'app.services',
  'app.directives',
])

.constant({'API_URL': resolveApiUrl()})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

function resolveApiUrl() {
    // if(window.location.origin === "http://localhost:8100") return 'http://localhost:3000';
    return 'https://pomodoro-database.herokuapp.com'
    // return 'http://localhost:3000'
  }
