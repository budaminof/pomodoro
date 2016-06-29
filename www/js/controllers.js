angular.module('app.controllers', [])

.controller('welcomeCtrl', function($scope) {

})

.controller('pomodoroCtrl', function($scope, $state, pomodoroFactory) {
  var vm = this;
  vm.form = {};
  vm.form.submitName = submitName;
  console.log("controller is working POMODORO");


  function submitName (){
    pomodoroFactory.pomodoroName(name);
    $state.go("tabsController.pomoforoTimer");
    vm.form = {};
    return
  }

})

.controller('pomoforoTimerCtrl', function($scope, pomodoroFactory, $state, $interval, $cordovaVibration, $ionicPlatform) {
  var vm = this;
  vm.pomodoroName = pomodoroFactory.getPomodoroName();
  vm.time = 0;

  var interval = $interval(function () {
    vm.time++;

    if(vm.time === 10) {
      $interval.cancel(interval);
      console.log("vibrating!!");

      $ionicPlatform.ready(function() {
        $cordovaVibration.vibrate(100);
      });

      vm.time = 0;
      $state.go('break-time', {}, {reload: true});
    }
  },1000)


})

.controller('pomodoroBreakCtrl', function($scope, pomodoroFactory, $state, $interval, $cordovaVibration, $ionicPlatform) {

})
