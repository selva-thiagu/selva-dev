/**
*  Component: Home
*
* Description: Welcome page of the application is added as additional component
* for better understanding of the folder structure
*/
angular.module('home', []);

angular.module('home').controller('homeController', ['$scope', function($scope){
  $scope.projectName = "Content Management System";
}]);