describe('MappingApp', function () {

    angular.module('MappingApp', []);
    var service,
        mockHttp = {
        };

    beforeEach(function () {
        module('MappingApp');
    });

    describe('jobsService', function () {

        beforeEach(inject(function (jobsService, $http) {
            service = jobsService;
            mockHttp = $http;
        }));

        it('should contain a jobsService', function() {
          expect(service).not.to.equal(null);
        });
    });
});
