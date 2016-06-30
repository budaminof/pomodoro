angular.module('app.controllers', [])

.controller('welcomeCtrl', function($scope) {

})

.controller('pomodoroCtrl', function($scope, $state, pomodoroFactory) {
  var vm = this;
  vm.form = {};
  vm.form.submitName = submitName;

  function submitName (){
    pomodoroFactory.pomodoroName(vm.form.name);
    $state.go("tabsController.pomoforoTimer", {}, {reload: true});
    vm.form = {};
    return
  }

})

.controller('pomoforoTimerCtrl', function($scope, pomodoroFactory, $state, $interval, $cordovaVibration, $ionicPlatform, $cordovaDeviceMotion) {
  var vm = this;
  vm.pomodoroName = pomodoroFactory.getPomodoroName();
  vm.pomodoroLength = pomodoroFactory.getpomodoroLength();
  vm.time = 0;

  var interval = $interval(function () {
    vm.time++;
    if(vm.time === vm.pomodoroLength) {
      $interval.cancel(interval);
      $ionicPlatform.ready(function() {
        $cordovaVibration.vibrate(100);
      });
      vm.time = 0;
      $state.go('tabsController.pomodoroBreak', {}, {reload: true});
    }
  },1000)

})

.controller('pomodoroBreakCtrl', function($scope, pomodoroFactory, $state, $interval, $cordovaVibration, $ionicPlatform, $cordovaDeviceMotion) {
  var vm = this;
  vm.time = 0;
  vm.counter = 0;

  moving();

  function moving (){
    document.addEventListener("deviceready", function () {
      $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
        vm.first = result;
      }, function(err) {
        console.log(err);
      });
    }, false);

    nextStep();
  }

  function nextStep () {
    document.addEventListener("deviceready", function () {
      $cordovaDeviceMotion.getCurrentAcceleration().then(function(res) {
        vm.second = res;
        computeDot(vm.first, vm.second);
      }, function(err) {
        console.log(err);
      });
    }, false);
  }

  function computeDot(first, second) {
    //the dot product
    vm.dot = ((second.x * first.x) + (second.y * first.y) + (second.z * first.z));
    //length of vector a
    vm.a = Math.sqrt(first.x * first.x + first.y * first.y + first.z * first.z);
    //length of vector b
    vm.b = Math.sqrt(second.x * second.x + second.y * second.y + second.z * second.z);
    //the angle between vector a and vector b
    vm.acos = Math.acos((vm.dot / (vm.a * vm.b)));
    //if the angle is bigger than 0.54 radians (another angle mesurement)
    // radians: 360 deg = 2pi rad
    if (vm.counter === 6) return timeForAbreak();
    if (vm.counter < 6) {
      $ionicPlatform.ready(function() {
        $cordovaVibration.vibrate(50);
      });
    }
    if (vm.acos > 0.75) {
      vm.counter++;
      vm.first = vm.second;
    }
    nextStep();
  }

function timeForAbreak () {
  var interval = $interval(function () {
    vm.time++;
    if(vm.time === 10) {
      $interval.cancel(interval);
      $ionicPlatform.ready(function() {
        $cordovaVibration.vibrate(100);
      });
      return $state.go("tabsController.pomodoro", {}, {reload: true});
    }
  }, 1000)
}

})
