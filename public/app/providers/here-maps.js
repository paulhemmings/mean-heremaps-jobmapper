'use strict';

angular.module('MappingApp').provider('heremaps', function () {
    this._initialized = false;
    this._loaded = false;
    this.settings = {
        appId: '',
        appCode: '',
        secureConnection: true,
        testMode: true
    };

    // Make AJAX call to retrieve the HERE map credentials (don't store in file)

    this.retrieveMapCredentials = function($http) {
        return $http({
            url: '/api/map/credentials',
            method: 'GET'
        });
    };

    // Create handler for when the HERE script include element is loaded onto the page

    this.onElementLoadHandler = function ($rootScope, $log) {
        // Load features
        var self = this;
        window.nokia.Features.load(
            window.nokia.Features.getFeaturesFromMatrix(['all']),
            function () {
                $log.info('HERE maps API loaded');

                self._loaded = true;

                self.appId(self.settings.appId);
                self.appCode(self.settings.appCode);
                self.secureConnection(self.settings.secureConnection);
                self.testMode(self.settings.testMode);

                $rootScope.$broadcast('mapping-event-loaded');
            },
            function (error) {
                $log.error('HERE maps API failed to load. ' + error);

                $rootScope.$broadcast('mapping-event-error', error);
            },
            null,
            false
        );
        // notify maps fully initialized
        $rootScope.$broadcast('mapping-event-initialized');
    };

    // Curry a method with empty signature that I can use as an event handler
    // but which has access to $rootScope and $log

    this.buildElementLoadHandler = function($rootScope, $log) {
        var self = this;
        return function() {
            self.onElementLoadHandler($rootScope, $log);
        };
    };

    // Define $get (called when the provider is loaded into the app)

    this.$get = function ($rootScope, $log, $http) {
        var self = this;

        if (!self._initialized) {
            self.retrieveMapCredentials($http).then(function(response) {
                // set the credentials
                self.appId(response.data.appId);
                self.appCode(response.data.appCode);
                // load the elements
                var elem = document.createElement('script');
                elem.type = 'text/javascript';
                elem.src = 'https://js.api.here.com/se/2.5.3/jsl.js?blank=true';
                elem.onload = self.buildElementLoadHandler($rootScope, $log);
                document.getElementsByTagName('head')[0].appendChild(elem);
                self._initialized = true;
            });
        }

        return self;
    };

    this.appId = function (appId) {
        if (appId) {
            this.settings.appId = appId;

            if (this._loaded) {
                window.nokia.Settings.set('app_id', this.settings.appId);
            }
        }

        return this.settings.appId;
    };

    this.appCode = function (appCode) {
        if (appCode) {
            this.settings.appCode = appCode;

            if (this._loaded) {
                window.nokia.Settings.set('app_code', this.settings.appCode);
            }
        }

        return this.settings.appCode;
    };

    this.secureConnection = function (secureConnection) {
        if (secureConnection === Boolean) {
            this.settings.secureConnection = secureConnection;

            if (secureConnection === true && this._loaded) {
                window.nokia.Settings.set('secureConnection', 'force');
            }
        }

        return this.settings.secureConnection;
    };

    this.testMode = function (testMode) {
        if (testMode === Boolean) {
            this.defaultSettings.testMode = testMode;

            if (testMode === true && this._loaded) {
                window.nokia.Settings.set('serviceMode', 'cit');
            }
        }

        return this.settings.testMode;
    };
});
