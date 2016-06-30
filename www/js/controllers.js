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
  moving();

  function moving (){
    document.addEventListener("deviceready", function () {
      $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
        vm.first = result;
        vm.X = result.x;
        vm.Y = result.y;
        vm.Z = result.z;
        // vm.timeStamp = result.timestamp;
      }, function(err) {
        console.log(err);
      });
    }, false);

    $interval(function (){
      nextStep();
    }, 500)
  }

  function nextStep () {
    document.addEventListener("deviceready", function () {
      $cordovaDeviceMotion.getCurrentAcceleration().then(function(res) {
        vm.test = "*************************************";
        vm.second = res;
        vm.a = res.x;
        vm.b = res.y;
        vm.c = res.z;

        computeDot(vm.first, vm.second);

      }, function(err) {
        console.log(err);
      });
    }, false);
  }

  function computeDot(first, second){
    vm.dot = (second.x * first.x) + (second.y * first.y) + (second.z * first.z);
    // vm.a = ABS(sqrt(px * px + py * py + pz * pz));
    // vm.b = ABS(sqrt(xx * xx + yy * yy + zz * zz));

  }
  //
  // dot /= (a * b);
  //
  // if (dot < sensitivity) // bounce
  // {
  //     if (!isChange)
  //     {
  //         isChange = YES;
  //          // count increases and all work done here
  //     } else {
  //         isChange = NO;
  //     }
  //     px = xx; py = yy; pz = zz;
  // }


  // var interval = $interval(function () {
  //   vm.time++;
  //   if(vm.time === 3) {
  //     $interval.cancel(interval);
  //     // $ionicPlatform.ready(function() {
  //     //   $cordovaVibration.vibrate(100);
  //     // });
  //     vm.time = 0;
  //     $state.go("tabsController.pomodoro", {}, {reload: true});
  //   }
  // },1000)

})
