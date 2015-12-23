'use strict';

describe('crudService services', function () {
    
    var crudService, $httpBackend;

    beforeEach(module('crud', function($provide) {
      // Do some other stuff before each test run if you want...
    }));

    beforeEach(inject(function (_$httpBackend_, _foo_) {
      $httpBackend = _$httpBackend_;
      crudService = _crudService_;
    }));

    it('crudService.getList() - test', function () {
        $httpBackend.expectGET('api/getAllContacts').respond({
          "id": 1,
          "name": "Terrence S. Hatfield",
          "phone": "651-603-1723",
          "email": "TerrenceSHatfield@rhyta.com",
          "avatar": "1.jpg"
          }, 
          {
          "id": 2,
          "name": "Chris M. Manning",
          "phone": "513-307-5859",
          "email": "ChrisMManning@dayrep.com",
          "avatar": "2.jpg"
          }, 
          {
          "id": 3,
          "name": "Ricky M. Digiacomo",
          "phone": "918-774-0199",
          "email": "RickyMDigiacomo@teleworm.us",
          "avatar": "3.jpg"
          }
        );
        crudService.getList().then(function(data) {
            expect(data).length.toEqual(3);
        });
        $httpBackend.flush();
    });

});