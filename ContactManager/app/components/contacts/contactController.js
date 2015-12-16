/**
*  Module: Contacts
*
* Description: This module is responsible for contact management and will handle CRUD operations on contacts
*/
angular.module('contacts', ['crud']);

angular.module('contacts').controller('contactController', ['$scope', '$location', 'crudService', function($scope, $location, crudService){

	//This url can get from a config file. I defined it here to make it simple in demo app.
	$scope.url = "app/datarepo/contacts.json";
    

    //Contains the list of contacts to be rendered.
    $scope.contacts = [];
    
    //Contains the ngModel values for form interaction.
    $scope.form = {
    	id:"",
        name: "",
        email:"",
        phone:"",
        avatar:""
    };
    

    //get data from the remote source
    if((localStorage.getItem('contacts')===null)){
        loadDatafromSource($scope.url);
    }else{
        loadDatafromLocalStorage();
    }
    
    //loadDatafromLocalStorage();

    /**
    * PUBLIC METHODS.
    * ---
    */ 
   // This method will process the add-contact form.
    $scope.add = function(contact){
        // We should inform the user with custom messages if any error occurs.
        // Here I'm just logging to the console to keep things simple for the demo.
        contact.id = $scope.maxId+1;
        contact.avatar = contact.id+'.jpg';
        console.log('new id is'+ contact.id);
        crudService.add($scope.url, contact)
            .then(
                function(){
                    //loadDatafromSource($scope.url)
                    $scope.contacts.push(contact);
                    localStorage.setItem('contacts', JSON.stringify($scope.contacts));
                    $location.path('/#/contacts');
                },
                function(errorMessage) {
                    console.warn(errorMessage);
                }
            );
        // Reset the form once values have been consumed.
        $scope.form = "";
    };
    // Remove the given contact from the current collection.
    $scope.remove = function(){
        // once contact is removed, I'm just going to reload the fresh data from source.
    };
    // Update the given contact from the current collection.
    $scope.edit = function(){
        // Reloading data, once update is done.
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
        crudService.getList(url)
            .then(
                function(contacts) {
                    $scope.contacts = contacts;
                    $scope.maxId = Math.max.apply(Math,$scope.contacts.map(function(o){return o.id;}));
                    console.log('Actual data is ----'+JSON.stringify($scope.contacts));
                    localStorage.setItem('contacts', JSON.stringify($scope.contacts));
                    console.log("max id is"+$scope.maxId);
                }
            );
    };

    function loadDatafromLocalStorage(){
        $scope.contacts = JSON.parse(localStorage.getItem('contacts'));
        $scope.maxId = Math.max.apply(Math,$scope.contacts.map(function(o){return o.id;}));       
    }      

}]);