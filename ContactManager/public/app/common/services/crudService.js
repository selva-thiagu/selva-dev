/**
 *  SERVICE: CRUD SERVICE
 *
 * Description: This service handles the crud operation on specific model/entity
 */
angular.module('crud', []);
angular.module('crud').service('crudService', ['$http', '$q', function($http, $q) {
    // Return public API.
    return ({
        add: add,
        getList: getList,
        get: get,
        edit: edit,
        remove: remove
    });
    /**
     * PUBLIC METHODS.
     * ---
     * Add a contact(any entity) with the given data to the collection.
     */
    function add(url, data) {
        var request = $http({
            method: "post",
            url: url,
            data: data
        });
        return (request.then(handleSuccess, handleError));
    };
    // Get all of the contacts(entities) in the collection.
    function getList(url) {
        var request = $http({
            method: "get",
            url: url,
            params: {
                action: "get"
            }
        });
        return (request.then(handleSuccess, handleError));
    };
    // Get a specific contact(entity) from the collection.
    function get(url, id) {
        var request = $http({
            method: "get",
            url: url,
            params: {
                action: "get"
            },
            data: {
                id: id
            }
        });
        return (request.then(handleSuccess, handleError));
    };
    // Update the contact(entity) details with the given ID from the collection.
    function edit(url, data) {
        var request = $http({
            method: "put",
            url: url,
            params: {
                action: "update"
            },
            data: data
        });
        return (request.then(handleSuccess, handleError));
    };
    // Remove the contact(entity) with the given ID from the remote collection.
    function remove(url, id) {
        var request = $http({
            method: "delete",
            url: url,
            data: {
                id: id
            }
        });
        return (request.then(handleSuccess, handleError));
    };
    /** ---
     * PRIVATE METHODS.
     * ---
     * This mehtod will transform the error response, unwrapping the application dta from
     * the API response payload.
     */
    function handleError(response) {
        // If the request was not handled by the server 
        // (ex. server error), then we may have to normalize it on our end, as best we can.
        if (!angular.isObject(response.data) ||
            !response.data.message
        ) {
            return ($q.reject("An unknown error occurred."));
        }
        // Otherwise, use expected error message.
        return ($q.reject(response.data.message));
    };
    // This method will transform the successful response, 
    // unwrapping the application data from the API response payload.
    function handleSuccess(response) {
        return (response.data);
    };
}]);
