'use strict';


function IndexCtrl($scope, $http) {
}

function LoginCtrl($scope, $http, $rootScope, $location) {
    $scope.user = {};
    $scope.statusMessage = '';

    //figure out where we should redirect to once the user has logged in.
    if (!$rootScope.redirect || $rootScope.redirect == '/login') {
        $rootScope.redirect = '/todos';
    }

    $scope.submit = function (user) {
        $http.post('/user/login', $scope.user)
            .success(function (data) {
                $rootScope.user.username = $scope.user.username;
                $location.path($rootScope.redirect);
            })
            .error(function (data, status, headers, config) {
                $scope.statusMessage = data;
            });
    }
}

function RegisterCtrl($scope, $http, $rootScope, $location) {
    $scope.user = {};
    $scope.statusMessage = '';

    $scope.submit = function (user) {
        $http.post('/user/register', $scope.user)
            .success(function (data) {
                $rootScope.user.username = $scope.user.username;
                $location.path('/todos');
            })
            .error(function (data, status, headers, config) {
                $scope.statusMessage = data;
            });
    }
}

function VendorsCtrl($scope, $http, Vendor) {
    $scope.vendors = [];
    
    getVendorsFromServer();

    
    // get vendors list 
    function getVendorsFromServer() {
        console.log('getting vendors from server');
        Vendor.query(function(data) {
            $scope.vendors = data;
        });
    }

    // add new vendor
    $scope.createVendor = function (vendor) {
        if ($scope.newVendorForm.$invalid) {
            return;
        }
        Vendor.save({}, $scope.newVendor,
            function (data) {
                $scope.vendors.push(data);
                $scope.statusMessage = '';
                $scope.newVendor = {};

            },
            function (data, status, headers, config) {
                if (data.status == 200) {
                    $scope.statusMessage = 'New vendor has been added!';
                }
                else if (data.status == 400) {
                    $scope.statusMessage = 'This vendor is already in the database';
                }
                else {
                    $scope.statusMessage = 'Please try again';    
                }
            });
    }
}

function TodosCtrl($scope, $http, Todo) {

    //get the todos from server
    getTodosFromServer()

    $scope.newTodo = {};

    //function to create a new Todo object
    $scope.createTodo = function (todo) {
        if ($scope.newTodoForm.$invalid) {
            return;
        }
        Todo.save({}, $scope.newTodo,
            function (data) {
                $scope.todos.push(data);
                $scope.statusMessage = '';
                $scope.newTodo = {};

            },
            function (data, status, headers, config) {
                $scope.statusMessage = data;
            });
    }

    //we'll call this function when the checkbox of a todo is checked
    $scope.markComplete = function (todo) {
        todo.$save({id: todo._id});
    }

    //remove complete todos
    $scope.removeComplete = function () {
        $scope.todos.forEach(function (todo) {
            if (todo.complete) {
                todo.$delete({id: todo._id}, function(){                    //delete on server
                    $scope.todos.splice( $scope.todos.indexOf(todo), 1 );   //remove from client
                });
            }
        })
    }

    function getTodosFromServer() {
        Todo.query(function (data) {
            $scope.todos = data;
        });
    }

}

function InvoicesCtrl($scope, ItemUnits, Vendor, Invoice, $http) {
    $scope.subtotal = 0;
    $scope.total = 0;
    $scope.tax = 0;
    $scope.newInvoice = {
        vendor: "",
        taxPercent: 0,
        number: "",
        date: new Date(),
        items: []
    };
    $scope.selectedItems = [];
    $scope.units = ItemUnits;
    $scope.gridOptions = { 
        data: 'newInvoice.items',
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEditOnFocus: true,
        columnDefs: [
            {field: 'name', displayName: 'Name', enableCellEdit: true}, 
            {field:'unit', displayName:'Unit', enableCellEdit: false},
            {field:'quantity', displayName:'Quantity', enableCellEdit: true},
            {field:'unitPrice', displayName:'Unit Price', enableCellEdit: true},
            {field:'subTotal', displayName:'Subtotal', enableCellEdit: true}
        ],
        selectedItems: $scope.selectedItems
    };

    $scope.addItem = function() {
        $scope.newInvoice.items.push($scope.newItem);
        $scope.newItem = null;
    };


    // autocomplete vendor
    $scope.getVendorSuggestion = function(vendor) {
        if (vendor)
            if (vendor.length >=3)
                return $http.get('/api/Vendor/autocomplete/' + vendor).then(function(res) {
                    return res.data;
                });
    };

    // autocomplete item
    $scope.getItemSuggestion = function(item) {
        if (item)
            if (item.length >=3)
                return $http.get('/api/Item/autocomplete/' + item).then(function(res) {
                    return res.data;
                });
    };


    // update subtotal whenever quantity or unit price chance
    $scope.$watch('newItem.quantity + newItem.unitPrice', function() {
        if ($scope.newItem)
            $scope.newItem.subTotal = $scope.newItem.quantity * $scope.newItem.unitPrice;
    });


    // update total price when data changes
    $scope.$watch(function() {
        var subtotal = 0;
        var items = $scope.newInvoice.items;
        var n = items.length;
        for (var i=0; i<n; i++) {
            if (items[i])
                subtotal += items[i].subTotal;
        }
        $scope.subtotal = subtotal;
        $scope.tax = subtotal * $scope.newInvoice.taxPercent / 100;
        $scope.total = subtotal + $scope.tax;
    });

    // save invoice to database
    $scope.saveInvoice = function() {
        Invoice.save({}, $scope.newInvoice);
    }

    // delete selecting rows
    $scope.removeSelectingItems = function() {
        $scope.newInvoice.items = _.difference($scope.newInvoice.items, $scope.selectedItems);
    }
}
