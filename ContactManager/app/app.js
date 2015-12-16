/**
*  Module
*
* Description
*/
var contactManagementApp = angular.module('ContactManagementApp', ['ngRoute', 'home', 'contacts']);

//Adding routing configuration
contactManagementApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider.
		when('/',
		{
			templateUrl: 'app/components/contacts/contactsView.html',
			controller: 'contactController'
		})
		.when('/contacts',
		{
			templateUrl: 'app/components/contacts/contactsView.html',
			controller: 'contactController'
		})
		.when('/contact/update/:id',
		{
			templateUrl: 'app/components/contacts/contactAddEdit.html',
			controller: 'contactController'
		})
		.when('/contact/add',
		{
			templateUrl: 'app/components/contacts/contactAddEdit.html',
			controller: 'contactController'
		})
		.when('/contact/remove/:id',
		{
			templateUrl: 'app/components/contacts/contactAddEdit.html',
			controller: 'contactController'
		})
		.otherwise({
		redirectTo: '/'
		});
}]);