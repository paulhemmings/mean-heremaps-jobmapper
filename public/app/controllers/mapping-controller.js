'use strict';

angular
    .module('MappingApp')
    .controller('MappingController', ['$scope', '$rootScope', 'openLayersService', 'jobsService',
        function($scope, $rootScope, openLayersService, jobsService) {

            $scope.jobLocations = [];

            $scope.zoomIn = function() {
                openLayersService.zoomIn();
            };

            $scope.zoomOut = function() {
                openLayersService.zoomOut();
            };

            $scope.addMarker = function() {
                openLayersService.addMarker(37.7895630, -122.4003550, {
                   text: 'Hi!', // Small label
                   draggable: false // Make the marker non-draggable
                });
            };

            function onMapLoaded() {
                openLayersService.loadMap('mapContainer', {
                    zoomLevel: 10,
                    latitude:37.7895630,
                    longitude:-122.4003550
                });
            }

            function onJobsLoaded(response) {
                response.data.forEach(function(job) {
                    openLayersService.addMarker(job.latitude, job.longitude, {
                        text: job.name
                    });
                });
            }

            function onMapReady() {
                jobsService.listJobs().then(onJobsLoaded);
            }

            function initialize() {
                $rootScope.$on('mapping-event-loaded', onMapLoaded);
                $rootScope.$on('mapping-event-ready', onMapReady);
            }

            initialize();

            /*
             * How do you unit test private methods?
             * Expose them via a 'test' property
             */

            $scope.__test__ = {
                initialize: initialize,
                onMapLoaded: onMapLoaded,
                onJobsLoaded: onJobsLoaded,
                onMapReady: onMapReady
            };

        }]);
