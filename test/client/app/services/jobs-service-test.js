describe('Jobs Service', function () {

    var service,
        mockHttp = {
        };

    beforeEach(function () {
        module('MappingApp');
    });

    beforeEach(inject(function (jobsService, $http) {
        service = jobsService;
        mockHttp = $http;
        spyOn(service, 'makeRequest');
    }));

    it("should list jobs", function() {
        service.listJobs();
        expect(service.makeRequest).toHaveBeenCalledWith('/api/jobs', 'GET');
    });

});
