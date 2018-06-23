(function () {
    'use strict';

    angular
        .module('elogbooks.job')
        .controller('JobEditController', ['$http', '$state', JobEditController]);

    function JobEditController($http, $state) {
        var vm = this;

        $http.get(
            'http://localhost:8001/job/' + $state.params.id
        ).then(function (response) {
            vm.job = {
                description : response.data.description,
                status: response.data.status
            };
        }, function () {
            vm.job = {
                description : null,
                status: null
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
