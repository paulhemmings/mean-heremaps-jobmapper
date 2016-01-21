describe('Nokia Factory', function () {

    var factory,
        mockNokia = {};

    beforeEach(function () {
        module('MappingApp');
    });

    beforeEach(inject(function (nokiaFactory) {
        factory = nokiaFactory;
        window.nokia = mockNokia;
    }));

    it("should return the global nokia object", function() {
        expect(factory()).toEqual(mockNokia);
    });

});
