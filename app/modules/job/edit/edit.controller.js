(function () {
    'use strict';

    angular
        .module('elogbooks.job')
        .controller('JobEditController', ['$http', '$state', '$scope', JobEditController]);

    function JobEditController($http, $state, $scope) {
        var vm = this;

        $http.get(
            'http://localhost:8001/user'
        ).then(function (response) {
            $scope.users = response.data.data;
        }, function () {
            console.log('Request Failed');
        });

        $http.get(
            'http://localhost:8001/job/' + $state.params.id
        ).then(function (response) {
            vm.job = {
                description : response.data.description,
                status: response.data.status,
                user: response.data.user ? response.data.user.id : null
            };
        }, function () {
            vm.job = {
                description : null,
                status: null,
                assignee: null
            };
        });

        vm.edit = edit;
        function edit() {
            $http.put(
                'http://localhost:8001/job/' + $state.params.id,
                vm.job
            ).then(function (response) {
                $state.go('jobs.view', {id:response.data.id});
            }, function () {
                console.log('Request Failed');
            });
        }
    }
})();
