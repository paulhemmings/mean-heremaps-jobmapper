'use strict';

/*
 * Main Angular module
 *
 * Style guide:
 * avoid polluting global namespace:
 *  var app = angular.module('app');
 */

angular.module('MappingApp', ['ui.router']);

/*
 * Add SPA Routing using route provider
 *
 * Style guide:
 * avoid using a variable and instead use chaining with the getter syntax
 *
 */

angular
    .module('MappingApp')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/mapping');

        $stateProvider
            .state('home', {
                url:'/mapping',
                views: {
                    'content': {
                        templateUrl: '/app/partials/mapping.html',
                        controller: 'MappingController'
                    }
                }
            });
    }])
    .run( function($rootScope, openLayersMap) {
        // this will fire off the heremaps provider
        // so it is *needed* even if it isn't actually used.
    });
