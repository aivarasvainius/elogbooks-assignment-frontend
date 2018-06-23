(function () {
    'use strict';

    angular
        .module('elogbooks.user')
        .controller('UserEditController', ['$http', '$state', UserEditController]);

    function UserEditController($http, $state) {
        var vm = this;
        $http.get(
            'http://localhost:8001/user/' + $state.params.id
        ).then(function (response) {
            vm.user = {
                name : response.data.name,
                email: response.data.email
            };
        }, function () {
            vm.user = {
                name : null,
                email: null
            };
        });

        vm.edit = edit;
        function edit() {
            $http.put(
                'http://localhost:8001/user/' + $state.params.id,
                vm.user
            ).then(function (response) {
                $state.go('users.view', {id:response.data.id});
            }, function () {
                console.log('Request Failed');
            });
        }
    }
})();
