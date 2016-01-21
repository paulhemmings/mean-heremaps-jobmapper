'use strict';

describe("Here Service", function() {

  // define test wide variables

  var service, rootScope, nokia;
  var mapInstance = jasmine.createSpyObj('map', ['addComponent', 'setZoomLevel', 'addListener']);

  // Define the overly complicated Nokia mock object
  // there HAS to be a better way of defining these objects, right?

  var mockNokiaObject = {
      maps: {
          map : {
              Display : function() {},
              Marker : function() {},
              component : {
                  zoom : {
                      DoubleClick : function() {}
                  },
                  panning : {
                      Drag : function() {},
                      Kinetic : function() {}
                  }
              }
          },
          util : {
            Point : function() {}
          },
          geo : jasmine.createSpyObj('geo', ['Coordinate'])
      }
  };

  // Define the object to be returned *outside* the method otherwise
  // it returns a new instance each time, causing the expect calls will fail.

  var mockNokia = function() {
      return mockNokiaObject;
  };

  // instantiate the main app

  beforeEach(angular.mock.module('MappingApp'));

  // inject the mock nokia object as a provider for the nokiaFactory

  beforeEach(function() {
      angular.mock.module(function ($provide) {
          $provide.value('nokiaFactory', mockNokia);
      });
  });

  // inject hereService and rootScope

  beforeEach(angular.mock.inject(function (hereService, $rootScope, nokiaFactory) {
      service = hereService;
      rootScope = $rootScope;
      nokia = nokiaFactory;
  }));

  // Hide map instance.

  beforeEach(function() {
      spyOn(service, 'getMapInstance').and.callFake(function() {
          return mapInstance;
      });
      service.zoomIncrement = 1;
      mapInstance.zoomLevel = 1;
      mapInstance.objects = jasmine.createSpyObj('objects', ['add']);

  });

  // Verify we've injected the mock nokia object (bit of a null test)

  it('should return value from mock dependency for nokia-factory', function () {
       expect(nokia).toEqual(mockNokia);
   });

  it("should load a map with the required components", function() {
      var container, options;
      service.loadMap(container, options);

  });

  it ("should create a marker using the coordiantes provided", function() {
      // given
      var lat, long, options;
      spyOn(mockNokiaObject.maps.map, 'Marker');
      // when
      service.createMarker(lat, long, options);
      // then
      expect(mockNokiaObject.maps.geo.Coordinate).toHaveBeenCalledWith(lat, long);
      expect(mockNokiaObject.maps.map.Marker).toHaveBeenCalled();
  });

  it("should notify when map is ready to be used", function() {
      // when
      spyOn(rootScope, '$broadcast');
      // then
      service.onDisplayReady();
      expect(rootScope.$broadcast).toHaveBeenCalledWith('heremaps-ready');
  });

  it("zoom should decrement the current zoom level", function() {
      // when
      service.zoomIn();
      // then
      expect(service.getMapInstance).toHaveBeenCalled();
      expect(mapInstance.setZoomLevel).toHaveBeenCalledWith(0);
  });

  it("zoom should increment the current zoom level", function() {
      // when
      service.zoomOut();
      // then
      expect(service.getMapInstance).toHaveBeenCalled();
      expect(mapInstance.setZoomLevel).toHaveBeenCalledWith(2);
  });

  it("should add a marker to the marker collection", function() {

    // given
    var fakeMarker = {};
    service.markers = [];
    spyOn(service, 'createMarker').and.callFake(function() {
        return fakeMarker;
    });

    // when no lat or long
    var lat, long, options = {};
    service.addMarker(lat, long, options);

    // then
    expect(service.createMarker).not.toHaveBeenCalledWith(lat, long, options);
    expect(service.getMapInstance).not.toHaveBeenCalled();
    expect(service.markers.length).not.toEqual(1);
    expect(mapInstance.objects.add).not.toHaveBeenCalledWith(fakeMarker);

    // when lat and long provided
    lat = 10, long = 10, options = {};
    service.addMarker(lat, long, options);

    // then
    expect(service.createMarker).toHaveBeenCalledWith(lat, long, options);
    expect(service.getMapInstance).toHaveBeenCalled();
    expect(service.markers.length).toEqual(1);
    expect(mapInstance.objects.add).toHaveBeenCalledWith(fakeMarker);
  });



});
