'use strict';

describe("Here Service", function() {

  beforeEach(angular.mock.module('MappingApp'));

  it('should have a working Here Service', angular.mock.inject(['hereService',
      function(hereService) {
          expect(hereService).not.to.equal(null);
      }])
  );

});
