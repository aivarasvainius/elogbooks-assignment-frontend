(function (){
    'use strict';

    angular
        .module('elogbooks.user', [])
        .config(registerRoutes);

    function registerRoutes($stateProvider) {
        $stateProvider
            .state('users', {
                abstract: true,
                url: '/users',
                template: '<ui-view/>'
            })
            .state('users.list', {
                url: '/list',
                controller: 'UserListController',
                controllerAs: 'vm',
                templateUrl: '/modules/user/list/list.html',
                resolve: {
                    userCollectionResponse : function ($http) {
                        return $http({
                            url: 'http://localhost:8001/user',
                            method: "GET",
                            params: {}
                        }).then(function (response) {
                            return response.data;
                        }, function () {
                            console.log('Request Failed');
                        });
                    }
                }
            })
    }
})();