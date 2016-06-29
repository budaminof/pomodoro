angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('tabsController.welcome', {
    url: '/welcome',
    views: {
      'tab1': {
        templateUrl: 'templates/welcome.html',
        controller: 'welcomeCtrl',
        controllerAs: 'vm'
      }
    }
  })

  .state('tabsController.pomodoro', {
    url: '/pomodoro',
    views: {
      'tab3': {
        templateUrl: 'templates/pomodoro.html',
        controller: 'pomodoroCtrl',
        controllerAs: 'vm',
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
        controller: 'pomoforoTimerCtrl',
        controllerAs: 'vm',
      }
    }
  })

  .state('tabsController.pomodoroBreak', {
    url: '/pomodoro-break',
    views: {
      'tab3': {
        templateUrl: 'templates/pomodoroBreak.html',
        controller: 'pomodoroBreakCtrl',
        controllerAs: 'vm',
      }
    }
  })

$urlRouterProvider.otherwise('/page1/welcome')



});
