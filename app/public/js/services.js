'use strict';


angular.module('myApp.services', ['ngResource'])
    .factory('Todo', function ($resource) {
        return $resource('/api/Todo/:id', {}, {
        });
    })
    // Vendor is a service that call CRUD api from server
    .factory('Vendor', function ($resource) {
		return $resource('/api/Vendor/:id', {}, {
			autocomplete: {
				method: 'GET'
			}
		});
	})
	.factory('Invoice', function ($resource) {
		return $resource('api/Invoice/:id', {}, {

		});
	})
	.value('ItemUnits', ["Bịch","Chai","Hôp","Vỉ","Viên","Thùng","Tuýp"]);

/*

angular.module('myApp.services', ['ngResource'])
	
*/