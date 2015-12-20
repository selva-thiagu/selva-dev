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
			controller: 'editContactController',
			templateUrl: 'app/components/contacts/contactEdit.html'
		})
		.when('/contact/add',
		{	
			controller: 'contactController',
			templateUrl: 'app/components/contacts/contactAddEdit.html'
		})
		.when('/contact/remove/',
		{
			templateUrl: 'app/components/contacts/contactsView.html',
			controller: 'contactController'
		})
		.otherwise({
		redirectTo: '/'
		});
}]);