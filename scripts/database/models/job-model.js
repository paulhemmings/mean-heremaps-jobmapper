'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var JobSchema = new Schema({
    jobId: {type: Schema.ObjectId},
    userId: {type: Schema.ObjectId},
  	name : {type: String},
  	latitude : {type: Number},
    longitude: {type: Number},
    address: {type: String},
    createdAt: {type: Date, required: true, default: Date},
    updatedAt: {type: Date, required: true, default: Date}
});

mongoose.model('Job', JobSchema);
