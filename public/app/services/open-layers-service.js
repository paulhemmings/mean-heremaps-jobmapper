'use strict';

angular
    .module('MappingApp')
    .service('openLayersService', ['$rootScope', 'openLayerFactory', function OpenLayersService($rootScope, openLayerFactory) {

        this.map = null;

        this.onDisplayReady = function() {
            $rootScope.$broadcast('mapping-event-ready');
        },

        this.loadMap = function(containerId, options) {
            var ol = openLayerFactory();

            var satLayer = new ol.layer.Tile({
                source: new ol.source.MapQuest({layer: 'sat'})
            });
            // satLayer.on('tileloadend', this.onDisplayReady);
            // satLayer.on('loadend', this.onDisplayReady);

            this.map = new ol.Map({
                target: containerId,
                layers: [ satLayer ],
                view: new ol.View({
                  center: ol.proj.fromLonLat([options.longitude, options.latitude]),
                  zoom: options.zoomLevel
                })
            });

            this.onDisplayReady();
        };

        this.zoomIn = function() {
        };

        this.zoomOut = function() {
        };

        this.createFeature = function(latitude, longitude, options) {
            var ol = openLayerFactory();
            return new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857')),
                name: options.title,
                population: 4000,
                rainfall: 500
            });
        }

        this.createIconStyle = function() {
            var ol = openLayerFactory();
            return new ol.style.Style({
                image: new ol.style.Icon(({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    opacity: 0.75,
                    src: 'images/office-building.png'
                }))
            });
        };

        this.addMarker = function(lat, long, options) {
            var ol = openLayerFactory();

            var feature = this.createFeature(lat, long, options);

            var vectorSource = new ol.source.Vector({
                features: [feature] //add an array of features
            });

            var vectorLayer = new ol.layer.Vector({
                source: vectorSource,
                style: this.createIconStyle()
            });

            this.map.addLayer(vectorLayer);

            return feature;
        };

    }]);
