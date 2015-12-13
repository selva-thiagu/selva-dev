/**
*  Module
*
* Description
*/
var contactManagementApp = angular.module('ContactManagementApp', ['ngRoute', 'home']);

contactManagementApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/', 
		{
			templateUrl: 'app/components/home/homeView.html',
			controller: 'homeController'
		}).
		otherwise({
		redirectTo: '/'
		});
}]);