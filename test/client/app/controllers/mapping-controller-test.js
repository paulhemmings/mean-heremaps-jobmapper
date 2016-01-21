describe('Mapping Controller', function () {

    var scope,
        controller,
        hereService = jasmine.createSpyObj('hereService', ['zoomOut', 'zoomIn', 'addMarker', 'loadMap', 'addMarker']),
        httpBackend;

    beforeEach(function () {
        module('MappingApp');
    });

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        controller = $controller('MappingController', {
            '$scope': scope,
            'hereService': hereService
        });
    }));

    it("zooming out should invoke the here services zoom out method", function() {
        // when
        scope.zoomOut();
        // then
        expect(hereService.zoomOut).toHaveBeenCalled();
    });

    it("zooming in should invoke the here services zoom out method", function() {
        // when
        scope.zoomIn();
        // then
        expect(hereService.zoomIn).toHaveBeenCalled();
    });

    it("add marker should invoke the here services add marker method", function() {
        // when
        scope.addMarker();
        // then
        expect(hereService.addMarker).toHaveBeenCalled();
    });

    it("should invoke the here service load map when the nokia elements are loaded", function() {
        // when
        scope.__test__.onMapLoaded();
        // then
        expect(hereService.loadMap).toHaveBeenCalled();
    });

    it("should invoke the here service add marker for each job loaded", function() {
        // given
        var response = {
            data : [{
                latitude : 1,
                longitude: 1,
                name: 'test job'
            }]
        };
        // when
        scope.__test__.onJobsLoaded(response);
        // then
        expect(hereService.addMarker).toHaveBeenCalledWith(1, 1, {text: 'test job'});
    });


});
