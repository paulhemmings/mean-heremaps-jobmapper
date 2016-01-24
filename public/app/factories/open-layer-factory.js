'use strict';

/*
 * Should never make use of global objects directly.
 * Retrieve them via a factory, that is then injected as a dependency.
 * https://www.airpair.com/angularjs/posts/top-10-mistakes-angularjs-developers-make
 */

angular
    .module('MappingApp')
    .factory('openLayerFactory', function() {

        // return a factory method
        // to call when the nokia object is required
        // as the open layer object will not
        // be immediately available.

        return function() {
            return window.ol;
        };

    });
