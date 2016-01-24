'use strict';

angular.module('MappingApp').provider('openLayersMap', function () {
    this._initialized = false;

    // create CSS element

    this.buildMappingElements = function($rootScope, $log, document) {
        // load the CSS element
        var mapElementStyle = document.createElement('link');
        mapElementStyle.type = 'text/css';
        mapElementStyle.href = 'http://openlayers.org/en/v3.13.0/css/ol.css';
        mapElementStyle.rel = "stylesheet"
        document.getElementsByTagName('head')[0].appendChild(mapElementStyle);

        // load the JS element
        var mapElementSource = document.createElement('script');
        mapElementSource.type = 'text/javascript';
        mapElementSource.src = 'http://openlayers.org/en/v3.13.0/build/ol.js';
        mapElementSource.onload = this.buildElementLoadHandler($rootScope, $log);
        document.getElementsByTagName('head')[0].appendChild(mapElementSource);
    }

    // Create handler for when the open layers script include element is loaded onto the page

    this.onElementLoadHandler = function($rootScope, $log) {
        $rootScope.$broadcast('mapping-event-loaded');
    }

    // Curry a method with empty signature that I can use as an event handler
    // but which has access to $rootScope and $log

    this.buildElementLoadHandler = function($rootScope, $log) {
        var self = this;
        return function() {
            self.onElementLoadHandler($rootScope, $log);
        };
    };

    // Define $get (called when the provider is loaded into the app)

    this.$get = function ($rootScope, $log) {
        if (!this._initialized) {
            this._initialized = true;
            this.buildMappingElements($rootScope, $log, document);
        }
        return this;
    };

});
