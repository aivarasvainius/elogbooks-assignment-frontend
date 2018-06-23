(function () {
    'use strict';

    angular
        .module('elogbooks.user')
        .controller('UserEditController', ['$http', '$state', UserEditController]);

    function UserEditController($http, $state) {
        var vm = this;
        vm.user = {
            name : null,
            email: null
        };
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
