angular.module('app.services', [])

.factory('pomodoroFactory', [function(){
  var _currentPomodoro;
  var _pomodoroLength = 5;
  var _pomodoroCount = 0;
  var _shortBreak = 5;
  var _LongBreak = 10;


  return {
    pomodoroName: pomodoroName,
    getPomodoroName: getPomodoroName,
    getpomodoroLength: getpomodoroLength,
    getPomodoroCount: getPomodoroCount,
    setPomoforoCount: setPomoforoCount,
    getShortBreak: getShortBreak,
    getLongBreak: getLongBreak,
  }

  function pomodoroName (name){
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

}])
