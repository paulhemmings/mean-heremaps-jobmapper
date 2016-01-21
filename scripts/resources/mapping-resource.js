'use strict';

exports.initialize = function(app, services, config) {

    app.get('/api/map/credentials', function (req, res) {
        res.json(config.mapping);
    });

};
