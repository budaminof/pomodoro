angular.module('app.services', [])

.factory('pomodoroFactory', [function(){
  var _currentPomodoro;
  var _pomodoroLength = 5;

  return {
    pomodoroName: pomodoroName,
    getPomodoroName: getPomodoroName,
    getpomodoroLength: getpomodoroLength,
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

}])
