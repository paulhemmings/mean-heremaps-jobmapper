'use strict';

/*
 * https://developer.here.com/documentation/download/maps_js_pub/2.5.3/Maps%20API%20for%20JavaScript%20Public%20v2.5.3%20Developer's%20Guide.pdf
 */

angular
    .module('MappingApp')
    .service('hereService', ['$rootScope', 'nokiaFactory', function HereService($rootScope, nokiaFactory) {

        return {

          mapInstance : null,
          markers : [],
          zoomIncrement : 1,

          getMapInstance : function() {
              return this.mapInstance;
          },

          onDisplayReady : function() {
              $rootScope.$broadcast('heremaps-ready');
          },

          loadMap : function(container, options) {
              this.mapInstance = new (nokiaFactory().maps.map).Display(container, options);
              this.getMapInstance().addComponent( new (nokiaFactory().maps.map).component.zoom.DoubleClick());
              this.getMapInstance().addComponent( new (nokiaFactory().maps.map).component.panning.Drag());
              this.getMapInstance().addComponent( new (nokiaFactory().maps.map).component.panning.Kinetic());
              this.getMapInstance().addListener('displayready', this.onDisplayReady);
          },

          zoomIn : function() {
              var newZoomLevel = this.getMapInstance().zoomLevel - this.zoomIncrement;
              this.getMapInstance().setZoomLevel(newZoomLevel);
          },

          zoomOut : function() {
              var newZoomLevel = this.getMapInstance().zoomLevel + this.zoomIncrement;
              this.getMapInstance().setZoomLevel(newZoomLevel);
          },

          createMarker : function(lat, long, options) {

              var extendedOptions = options || {
                  title: 'marker',
                  visibility: true,
                  draggable: false
              };

              extendedOptions.icon = 'images/office-building.png';
              extendedOptions.anchor = new (nokiaFactory().maps.util).Point(32, 32);

              return new (nokiaFactory().maps.map).Marker(
                 new (nokiaFactory().maps.geo).Coordinate(lat, long),
                 options
              );
          },

          addMarker : function(lat, long, options) {
              // var marker = new nokia.maps.map.StandardMarker(location, options);
              if (!lat || !long) {
                  return;
              }
              var marker = this.createMarker(lat, long, options);
              this.markers.push(marker);
              this.getMapInstance().objects.add(marker);
          }
      };

    }]);
