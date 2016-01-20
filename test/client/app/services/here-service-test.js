'use strict';

describe("Here Service", function() {

  // define test wide variables
  
  var service, rootScope;
  var mapInstance = jasmine.createSpyObj('map', ['addComponent', 'setZoomLevel']);

  // instantiate the main app

  beforeEach(angular.mock.module('MappingApp'));

  // inject hereService and rootScope

  beforeEach(angular.mock.inject(function (hereService, $rootScope) {
      service = hereService;
      rootScope = $rootScope;
  }));

  // Hide map instance.

  beforeEach(function() {
      spyOn(service, 'getMapInstance').and.callFake(function() {
          return mapInstance;
      });
      mapInstance.zoomLevel = 1;
      mapInstance.objects = jasmine.createSpyObj('objects', ['add']);
      service.zoomIncrement = 1;
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

    // when
    var lat, long, options;
    service.addMarker(lat, long, options);

    // then
    expect(service.createMarker).toHaveBeenCalledWith(lat, long, options);
    expect(service.getMapInstance).toHaveBeenCalled();
    expect(service.markers.length).toEqual(1);
    expect(mapInstance.objects.add).toHaveBeenCalledWith(fakeMarker);

  });



});
