var myApp = angular.module('myApp',[]);

myApp.controller('MyController', function MyController($scope) {
  $scope.author = {
    'name' : 'Daniel David',
    'title': 'Web Developer',
    'company': 'Dan.com'
  };
});
