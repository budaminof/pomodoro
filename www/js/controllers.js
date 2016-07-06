angular.module('app.controllers', [])

.controller('welcomeCtrl', function($scope) {
})

.controller('homeCtrl', function($scope, $cordovaDevice, pomodoroFactory) {
  var vm = this;
  console.log(moment().format());
  getPhoneId();

  function getPhoneId () {
      try {
          vm.uuid = $cordovaDevice.getUUID();
      } catch (err) {
          console.log(err);
      }
    }

  pomodoroFactory.getAllPomodoros(vm.uuid)
  .then(function(res) {
    for (var i = 0; i < res.length; i++) {
      var cut = res[i].created_at.indexOf('T');
      var newDate = res[i].created_at.split('').slice(0, cut).join('');
      res[i].date = newDate;
    }

    vm.pomodoros = res;
    var data = res.reverse();
    var dataObj = {};

    for (var j = 0; j < data.length; j++) {
      if (!dataObj[data[j].date]) dataObj[data[j].date] = 1;
      else dataObj[data[j].date]++ ;
    }

    var counter = 6;
    var finalArr = [];
    while (counter >= 0) {
      var theDay = moment().subtract(counter, 'days').format('YYYY-MM-DD');
      if(!dataObj[theDay]) dataObj[theDay] = 0;
      finalArr.push(dataObj[theDay]);
      counter--;
    }

    vm.labels = [
      moment().subtract(6, 'days').format('dddd').split('').slice(0,3).join(''),
      moment().subtract(5, 'days').format('dddd').split('').slice(0,3).join(''),
      moment().subtract(4, 'days').format('dddd').split('').slice(0,3).join(''),
      moment().subtract(3, 'days').format('dddd').split('').slice(0,3).join(''),
      moment().subtract(2, 'days').format('dddd').split('').slice(0,3).join(''),
      moment().subtract(1, 'days').format('dddd').split('').slice(0,3).join(''),
      moment().format('dddd').split('').slice(0,3).join(''),
      ];
    vm.chartdata = [finalArr];
    return
  })


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
  pomodoroFactory.setPomoforoCount();
  vm.time = vm.pomodoroLength;

  var interval = $interval(function () {
    vm.time--;
    if(vm.time === 0) {
      $interval.cancel(interval);
      $ionicPlatform.ready(function() {
        $cordovaVibration.vibrate(100);
      });
      $state.go('tabsController.pomodoroBreak', {}, {reload: true});
    }
  },1000)

})

.controller('pomodoroBreakCtrl', function($scope, pomodoroFactory, $state, $interval, $cordovaVibration, $ionicPlatform, $cordovaDeviceMotion, $cordovaDevice, $cordovaNativeAudio) {
  var vm = this;
  var audio = new Audio('beep-01a.mp3');
  vm.stepsToStop = 6;
  vm.counter = 0;
  if (pomodoroFactory.getPomodoroCount() <= 4){
    vm.breakLenght = pomodoroFactory.getShortBreak();
  } else {
    vm.breakLenght = pomodoroFactory.getLongBreak();
  }
  vm.time = vm.breakLenght;

  getPhoneId();
  function getPhoneId () {
      try {
          vm.uuid = $cordovaDevice.getUUID();
      } catch (err) {
          console.log(err);
      }
    }

  // timeForAbreak();
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
    //if the angle is bigger than 0.75 radians (another angle mesurement)
    // radians: 360 deg = 2pi rad
    if (vm.counter === vm.stepsToStop) return timeForAbreak();
    if (vm.counter < vm.stepsToStop) {
      $ionicPlatform.ready(function() {
        $cordovaVibration.vibrate(50);
        audio.play();
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
    vm.time--;
    if(vm.time === 0) {
      $interval.cancel(interval);
      $ionicPlatform.ready(function() {
        $cordovaVibration.vibrate(100);
        audio.play();
      });
      pomodoroFactory.finishedPomdoro(vm.uuid)
      .then(function (res) {
        return $state.go("tabsController.pomodoro", {}, {reload: true});
      })
    }
  }, 1000)
}

})
