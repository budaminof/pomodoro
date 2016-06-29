angular.module('app.services', [])

.factory('pomodoroFactory', [function(){
  var _currentPomodoro;

  return {
    pomodoroName: pomodoroName,
    getPomodoroName: getPomodoroName,
  }

  function pomodoroName (name){
     return _currentPomodoro = name;
  }

  function getPomodoroName (){
    return _currentPomodoro;
  }

}])
