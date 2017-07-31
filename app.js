'use strict';
var config = require('./config');
var logger = require('./logger')(module);
var AWS = require('aws-sdk');
var fs = require('fs');
var ws = fs.createWriteStream('output.log', {flags: 'a'});

AWS.config.update({
    accessKeyId: config.aws.access.id,
    secretAccessKey: config.aws.access.key,
    sslEnabled: true
});

var paramsSQS = {
    QueueUrl: config.aws.sqs.url,
    MaxNumberOfMessages: config.aws.sqs.maxMessge,
    VisibilityTimeout: 60
};

var sqs = new AWS.SQS({
    region: config.aws.region
});
function deletefromSQS(rhandle) {
    sqs.deleteMessage({
        QueueUrl: config.aws.sqs.url,
        ReceiptHandle: rhandle
    }, function (err, edata) {
        if (err) {
            logger.error(err);
        } else {
            logger.debug('Message deleted from SQS' + JSON.stringify(edata));
        }
    });

}
function start() {
    sqs.receiveMessage(paramsSQS, function (err, sdata) {
        if (err) {
            logger.error('ERROR :' + err);
        }
        else if (sdata && !!sdata.Messages){
            sdata.Messages.forEach(function (m) {
                var msg = JSON.parse(m.Body);
                ws.write(JSON.stringify(msg) + '\n');
                deletefromSQS(m.ReceiptHandle);
            });
        }
        setTimeout(start, config.aws.sqs.refreshTime);
    });
}

start();
