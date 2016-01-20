'use strict';

angular
    .module('MappingApp')
    .service('jobsService', function($http) {

        return {
            makeRequest: function (url, method, data) {
                return $http({
                    url: url,
                    data: data,
                    method: method
                });
            },
            listJobs: function () {
                return this.makeRequest('/api/jobs', 'GET');
            }
        };

    });
