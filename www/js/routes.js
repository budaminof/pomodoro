angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('tabsController.welcome', {
    url: '/welcome',
    views: {
      'welcome': {
        templateUrl: 'templates/welcome.html',
        controller: 'welcomeCtrl',
        controllerAs: 'vm'
      }
    }
  })

  .state('tabsController.history', {
    cache: false,
    url: '/history',
    views: {
      'history': {
        templateUrl: 'templates/history.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      }
    }
  })

  .state('tabsController.pomodoro', {
    cache: false,
    url: '/pomodoro',
    views: {
      'pomdoros': {
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
    cache: false,
    url: '/pomoforo-timer',
    views: {
      'pomdoros': {
        templateUrl: 'templates/pomoforoTimer.html',
        controller: 'pomoforoTimerCtrl',
        controllerAs: 'vm',
      }
    }
  })

  .state('tabsController.pomodoroBreak', {
    cache: false,
    url: '/pomodoro-break',
    views: {
      'pomdoros': {
        templateUrl: 'templates/pomodoroBreak.html',
        controller: 'pomodoroBreakCtrl',
        controllerAs: 'vm',
      }
    }
  })

$urlRouterProvider.otherwise('/page1/welcome');

});
