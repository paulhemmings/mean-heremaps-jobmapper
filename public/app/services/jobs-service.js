'use strict';

angular
    .module('MappingApp')
    .service('jobsService', function($http) {

        this.listJobs = function () {
            return $http({
                url: '/api/jobs',
                method: 'GET'
            });
        };

    });
