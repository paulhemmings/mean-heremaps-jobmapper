'use strict';

exports.initialize = function(app, services) {
    app.get('/api/jobs', function (req, res) {
        //res.setHeader('Content-Type', 'application/json');

        /*
         * http://mygeoposition.com/
         */

        res.json({
            'jobs': [
                {'name':'loyalty', 'lat':37.7895630, 'long':-122.4003550, 'address': '575 Market St, San Francisco' },
                {'name':'blackboard', 'lat':37.7969220, 'long':-122.4025290, 'address': '40 gold street' },
                {'name':'tacit', 'lat':37.7882910, 'long':-122.4041590, 'address': '27 maiden lane' },
                {'name':'slalom', 'lat':37.7907010, 'long':-122.3917500, 'address': '201 spear street' }
            ]
        });
    });
};
