'use strict';

angular
    .module('MappingApp')
    .service('jobsService', function($http) {

        function jobs() {
          return $http({
              url: '/api/jobs',
              method: 'GET'
          });
        }

        return {
            jobs: jobs
        };

    });
