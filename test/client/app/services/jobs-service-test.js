describe('Jobs Service', function () {

    var service,
        httpBackend;

    beforeEach(function () {
        module('MappingApp');
    });

    beforeEach(inject(function (jobsService, $httpBackend) {
        service = jobsService;
        httpBackend = $httpBackend;
    }));

    it("should list jobs", function() {
        service.listJobs();
        httpBackend.expect({
            url: '/api/jobs',
            method: 'GET'
        }).respond(200, "[{ success : 'true', id : 123 }]");
    });

});
