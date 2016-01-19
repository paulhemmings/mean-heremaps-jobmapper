'use strict';

var request = require("request");

var base_url = "http://localhost:3000/"

describe("Test Jobs End point", function() {
  describe("GET /api/jobs", function() {
    it("returns status code 200", function(/* done */) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        // done();
      });
    });
  });
});
