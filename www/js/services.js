angular.module('app.services', [])

.factory('pomodoroFactory', ['$http', 'API_URL', function($http, API_URL){
  var _currentPomodoro;
  var _pomodoroLength = 3;
  var _pomodoroCount = 0;
  var _shortBreak = 2;
  var _LongBreak = 5;
  var _allPomodoros;

  return {
    pomodoroName: pomodoroName,
    getPomodoroName: getPomodoroName,
    getpomodoroLength: getpomodoroLength,
    getPomodoroCount: getPomodoroCount,
    setPomoforoCount: setPomoforoCount,
    getShortBreak: getShortBreak,
    getLongBreak: getLongBreak,
    finishedPomdoro: finishedPomdoro,
    getAllPomodoros: getAllPomodoros,
  }

  function pomodoroName (name) {
    return _currentPomodoro = name;
  }

  function getPomodoroName (){
    return _currentPomodoro;
  }

  function getpomodoroLength () {
    return _pomodoroLength;
  }

  function getPomodoroCount () {
    return _pomodoroCount;
  }

  function setPomoforoCount () {
    return _pomodoroCount++;
  }

  function getShortBreak(){
    return _shortBreak;
  }

  function getLongBreak(){
    return _LongBreak;
  }

  function finishedPomdoro(phoneId) {
    var post = {
       phone_id: phoneId,
       name: _currentPomodoro,
     }
    return $http.post(API_URL + '/api/v1/users', post)
    .then(function (res) {
      return res
    })
  }

  function getAllPomodoros(phoneId){
    return $http.get(API_URL + '/api/v1/users/'+ phoneId)
    .then(function (res) {
      _allPomodoros = res.data;
      return _allPomodoros;
    })
  }

}])
