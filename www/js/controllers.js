angular.module('app.controllers', [])

.controller('welcomeCtrl', function($scope) {

})

.controller('pomodoroCtrl', function($scope, $state, pomodoroFactory) {
  var vm = this;
  vm.form = {};
  vm.form.submitName = submitName;

  function submitName (){
    pomodoroFactory.pomodoroName(vm.form.name);
    $state.go("tabsController.pomoforoTimer");
    vm.form = {};
    return
  }

})

.controller('pomoforoTimerCtrl', function($scope, pomodoroFactory, $state, $interval, $cordovaVibration, $ionicPlatform, $cordovaDeviceMotion) {
  var vm = this;
  vm.pomodoroName = pomodoroFactory.getPomodoroName();
  vm.moving = moving;
  vm.time = 0;

  var interval = $interval(function () {
    vm.time++;
    if(vm.time === 5) {
      $interval.cancel(interval);
      moving();
      $ionicPlatform.ready(function() {
        $cordovaVibration.vibrate(100);
      });
      vm.time = 0;
      // $state.go('tabsController.pomodoroBreak', {}, {reload: true});
    }
  },1000)

  function moving (){
    document.addEventListener("deviceready", function () {
        $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
          vm.X = result.x;
          vm.Y = result.y;
          vm.Z = result.z;
          vm.timeStamp = result.timestamp;
        }, function(err) {
          console.log(err);
        });
      }, false);

    setTimeout(function (){
      nextStep();
    }, 1000)
  }

  function nextStep () {
    document.addEventListener("deviceready", function () {
        $cordovaDeviceMotion.getCurrentAcceleration().then(function(res) {
          vm.test = "*************************************";
          vm.a = res.x;
          vm.b = res.y;
          vm.c = res.z;
          vm.foo = res.timestamp;
        }, function(err) {
          console.log(err);
        });
      }, false);
  }


})

.controller('pomodoroBreakCtrl', function($scope, pomodoroFactory, $state, $interval, $cordovaVibration, $ionicPlatform, $cordovaDeviceMotion) {
  var vm = this;
  vm.time = 0;

  var interval = $interval(function () {
    vm.time++;
    if(vm.time === 3) {
      $interval.cancel(interval);
      // $ionicPlatform.ready(function() {
      //   $cordovaVibration.vibrate(100);
      // });
      vm.time = 0;
      $state.go("tabsController.pomodoro", {}, {reload: true});
    }
  },1000)

})
