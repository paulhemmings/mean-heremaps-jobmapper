'use strict';

angular
    .module('MappingApp')
    .controller('MappingController', ['$scope', '$rootScope', 'hereService', 'jobsService',
        function($scope, $rootScope, hereService, jobsService) {

            $scope.jobLocations = [];

            $scope.zoomIn = function() {
                hereService.zoomIn();
            };

            $scope.zoomOut = function() {
                hereService.zoomOut();
            };

            $scope.addMarker = function() {
                hereService.addMarker(52.51, 13.4, {
                   text: 'Hi!', // Small label
                   draggable: false // Make the marker non-draggable
                });
            };

            function onMapLoaded() {
                hereService.loadMap(document.getElementById('mapContainer'), {
                    // Zoom level for the map
                    zoomLevel: 10,
                    // Map center coordinates
                    center: [37.7895630, -122.4003550]
                    }
                );
            }

            function onJobsLoaded(response) {
                response.data.forEach(function(job) {
                    hereService.addMarker(job.latitude, job.longitude, {
                        text: job.name
                    });
                });
            }

            function onMapReady() {
                jobsService.listJobs().then(onJobsLoaded);
            }

            function initialize() {
                $rootScope.$on('heremaps-loaded', onMapLoaded);
                $rootScope.$on('heremaps-ready', onMapReady);
            }

            initialize();

            /*
             * How do you unit test private methods?
             * Expose them via a 'test' property
             */

            $scope.__test__ = {
                initialize: initialize,
                onMapLoaded: onMapLoaded,
                onMapReady: onMapReady
            };

        }]);
