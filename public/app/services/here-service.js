'use strict';

/*
 * https://developer.here.com/documentation/download/maps_js_pub/2.5.3/Maps%20API%20for%20JavaScript%20Public%20v2.5.3%20Developer's%20Guide.pdf
 */

angular
    .module('MappingApp')
    .service('hereService', ['$rootScope', function HereService($rootScope) {

        var mapInstance;
        var markers = [];
        var zoomIncrement = 1;

        function onDisplayReady() {
            $rootScope.$broadcast('heremaps-ready');
        }

        function loadMap(container, options) {
            mapInstance = new nokia.maps.map.Display(container, options);

            mapInstance.addComponent( new nokia.maps.map.component.zoom.DoubleClick());
            mapInstance.addComponent( new nokia.maps.map.component.panning.Drag());
            mapInstance.addComponent( new nokia.maps.map.component.panning.Kinetic());

            mapInstance.addListener('displayready', onDisplayReady);
        }

        function zoomIn() {
            var newZoomLevel = mapInstance.zoomLevel - zoomIncrement;
            mapInstance.setZoomLevel(newZoomLevel);
        }

        function zoomOut() {
            var newZoomLevel = mapInstance.zoomLevel + zoomIncrement;
            mapInstance.setZoomLevel(newZoomLevel);
        }

        function createMarker(lat, long, options) {

            var extendedOptions = options || {
                title: 'marker',
                visibility: true,
                draggable: false
            };

            extendedOptions.icon = 'images/office-building.png';
            extendedOptions.anchor = new nokia.maps.util.Point(32, 32);

            return new nokia.maps.map.Marker(
               new nokia.maps.geo.Coordinate(lat, long),
               options
            );
        }

        function addMarker(lat, long, options) {
            // var marker = new nokia.maps.map.StandardMarker(location, options);
            var marker = createMarker(lat, long, options);
            markers.push(marker);
            mapInstance.objects.add(marker);
        }

        return {
            onDisplayReady: onDisplayReady,
            loadMap: loadMap,
            zoomIn: zoomIn,
            zoomOut: zoomOut,
            createMarker: createMarker,
            addMarker: addMarker
        };

    }]);
