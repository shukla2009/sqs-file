'use strict';
module.exports = {
    aws: {
        access: {
            id: process.env.AWS_ACCESS_ID,
            key: process.env.AWS_ACCESS_KEY
        },
        region: process.env.AWS_REGION,
        kinesis: {
            stream: process.env.AWS_KINESIS_STREAM
        },
        sqs: {
            url: process.env.AWS_ACCESS_URL
        }
    }
};