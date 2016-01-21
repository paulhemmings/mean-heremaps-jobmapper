'use strict';

exports.initialize = function(app, services) {

    /*
     * http://mygeoposition.com/
     */

    var testJobs = {
        'jobs': [
            {'name':'loyalty', 'latitude':37.7895630, 'longitude':-122.4003550, 'address': '575 Market St, San Francisco' },
            {'name':'blackboard', 'latitude':37.7969220, 'longitude':-122.4025290, 'address': '40 gold street' },
            {'name':'tacit', 'latitude':37.7882910, 'longitude':-122.4041590, 'address': '27 maiden lane' },
            {'name':'slalom', 'latitude':37.7907010, 'longitude':-122.3917500, 'address': '201 spear street' }
        ]
    };

    app.get('/api/jobs', function (req, res) {
        services['JobService'].all().then(
            function(jobs) {
                res.json(jobs);
            },
            function(error) {
                res.send(301, { 'error': error});
            }
        );
    });

    app.get('/api/load', function (req, res) {
        services['JobService'].push(req.body).then(
            function(job) {
                res.json(job);
            },
            function(error) {
                res.send(301, { 'error': error});
            }
        );
    });

    app.get('/api/initialize', function (req, res) {
        services['JobService'].all().then(
            function(jobs) {
                if (!jobs || !jobs.length) {
                    testJobs.jobs.forEach(function (job) {
                        services['JobService'].push(job);
                    });
                }
                res.send(jobs || testJobs.jobs);
            }
        );
    });

    app.get('/api/test', function (req, res) {
        //res.setHeader('Content-Type', 'application/json');
        res.json(testJobs);
    });
};
