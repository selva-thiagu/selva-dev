/**
 *  Module: Contacts
 *
 * Description: This module is responsible for contact management and will handle CRUD operations on contacts
 */
angular.module('contacts', ['crud']);

angular.module('contacts').controller('contactController', ['$scope', '$location', 'crudService', function($scope, $location, crudService) {

    //Contains the list of contacts to be rendered.
    $scope.contacts = [];
    //Contains the ngModel values for form interaction.
    $scope.form = {
        id: "",
        name: "",
        email: "",
        phone: "",
        avatar: ""
    };

    //get data from the remote source
    loadDatafromSource($scope.url);

    /**
     * PUBLIC METHODS.
     * ---
     */
    // This method will process the add-contact form.
    $scope.addorsave = function(contact) {
        // We should inform the user with custom messages if any error occurs.
        // Here I'm just logging to the console to keep things simple for the demo.
        contact.avatar = ($scope.maxId + 1) + '.jpg';
        var url = "api/addcontact";
        crudService.add(url, contact).then($location.path('/#/contacts'));
        $scope.form = "";
    };
    // Remove the given contact from the current collection.
    $scope.remove = function(contact) {
        var url = "api/removecontact?id=" + contact._id;
        crudService.remove(url, JSON.stringify(contact._id)).then($location.path('/#/contacts'));
        // once contact is removed, I'm just going to reload the fresh data from source.
    };
    /** ---
     * PRIVATE METHODS.
     * ---
     * This mehtod will transform the error response, unwrapping the application dta from
     * the API response payload.
     */
    // This method will load the data from the source.
    function loadDatafromSource(url) {
        // The crudService returns a promise.
        url = "api/getAllContacts";
        crudService.getList(url)
            .then(
                function(contacts) {
                    $scope.contacts = contacts;
                    $scope.maxId = contacts.length + 1;
                    $scope.updatecontact = null;
                }
            );
    };

    function loadDatafromLocalStorage() {
        $scope.contacts = JSON.parse(localStorage.getItem('contacts'));
        $scope.maxId = Math.max.apply(Math, $scope.contacts.map(function(o) {
            return o.id;
        }));
    }

}]);

angular.module('contacts').controller('editContactController', ['$scope', '$location', 'crudService', '$routeParams', function($scope, $location, crudService, $routeParams) {
    //crud service call to get the details of the contact to be updated
    var getUrl = "/api/getcontact/?id=" + $routeParams.id;
    crudService.get(getUrl, $routeParams.id).then(
        function(contact) {
            console.log('received contact is ---- ' + contact);
            $scope.updatecontact = contact;
            console.log('updatecontact is -----' + JSON.stringify($scope.updatecontact));
        }
    );
    // Update the given contact from the current collection.
    $scope.edit = function(contact) {
        var url = "api/updatecontact?id=" + contact._id;
        console.log('u-----------------------' + $scope.example);
        crudService.edit(url, contact).then($location.path('/#/contacts'));
        // Reloading data, once update is done.
    };

}]);
