angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.welcome', {
    url: '/welcome',
    views: {
      'tab1': {
        templateUrl: 'templates/welcome.html',
        controller: 'welcomeCtrl'
      }
    }
  })

  .state('tabsController.pomodoro', {
    url: '/pomodoro',
    views: {
      'tab3': {
        templateUrl: 'templates/pomodoro.html',
        controller: 'pomodoroCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.pomoforoTimer', {
    url: '/pomoforo-timer',
    views: {
      'tab3': {
        templateUrl: 'templates/pomoforoTimer.html',
        controller: 'pomoforoTimerCtrl'
      }
    }
  })

  .state('tabsController.pomodoroBreak', {
    url: '/pomodoro-break',
    views: {
      'tab3': {
        templateUrl: 'templates/pomodoroBreak.html',
        controller: 'pomodoroBreakCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1/welcome')

  

});