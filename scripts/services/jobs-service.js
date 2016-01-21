'use strict';
exports.name = 'JobService';

var Mongoose = require('mongoose');
var Job = Mongoose.model('Job');
var Promise = require('node-promise').Promise;
var curry = require('curry');

/*
 * Curry a method with signature (err, response)
 * that will resolve, reject the supplied promise
 */

var handler = curry(function(promise, err, response) {
    if(err) {
        console.log('saving failed with ', err);
        return promise.reject (err);
    }
    promise.resolve (response);
});

/*
 * Return all the jobs for that user
 */

exports.all = function(user) {
    var promise = new Promise();
  	//Job.find({ userId : user._id }, handler(promise));
    Job.find({ }, handler(promise));
    return promise;
};

/*
 * Push a new or existing Job into the collection
 */

exports.push = function(model) {
    var promise = new Promise();
  	var job = new Job(model || {});

    console.log('updating job', job._id);
    var upsertData = job.toObject();
		delete upsertData._id;
		Job.update({ _id : job._id }, upsertData, {upsert: true}, handler(promise));

    return promise;
};
