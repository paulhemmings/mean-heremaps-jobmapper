'use strict';

describe("Here Service", function() {

  beforeEach(angular.mock.module('MappingApp'));

  it('should have a working Here Service', angular.mock.inject(['hereService', '$rootScope',
      function(hereService, $rootScope) {
          spyOn($rootScope, '$broadcast');
          hereService.onDisplayReady();
          expect($rootScope.$broadcast).toHaveBeenCalledWith('heremaps-ready');
      }])
  );

});
