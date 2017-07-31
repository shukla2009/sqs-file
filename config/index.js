'use strict';
var _ = require('lodash');

var all = {
    env: process.env.NODE_ENV || 'production',
    aws: {
        sqs: {
            maxMessge: process.env.AWS_SQS_MAX_MESSAGE || 10,
            refreshTime: process.env.AWS_SQS_REFRESH_TIME || 10000
        }
    },
    log: {
        level: process.env.LOG_LEVEL || 'debug'
    }
};

// Export the config object based on the NODE_ENV
// ==============================================
var path = `./${all.env}.js`;
module.exports = _.merge(
    all,
    require(path) || {});