/**
*  Module: Home
*
* Description: Welcome page of the application
*/
angular.module('home', []);

angular.module('home').controller('homeController', ['$scope', function($scope){
  $scope.projectName = "Content Management System";
}]);