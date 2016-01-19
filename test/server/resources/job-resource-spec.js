'use strict';

var jobResource = require(__dirname + "/../../../scripts/resources/jobs-resource");

describe("Job Resource", function() {

    var appSpy;

    beforeEach(function() {
        appSpy = {
            get: function(path, fn) {
            }
        };
    });

    describe("initialize", function() {
        it("adds a jobs endpoint to app", function(/* done */) {
            var services = [];
            spyOn(appSpy, 'get');
            jobResource.initialize(appSpy, services);
            expect(appSpy.get).toHaveBeenCalled();
            expect(appSpy.get).toHaveBeenCalledWith('/api/jobs', jasmine.any(Function));
        });
    });

});
