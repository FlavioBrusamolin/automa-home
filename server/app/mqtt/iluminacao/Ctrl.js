var mqtt = require('mqtt');

var options = {
    port: 13190,
    host: 'mmqtt://m15.cloudmqtt.com',
    clientId: 'AC326' + Math.random().toString(16).substr(2, 8),
    username: 'wkeuusha',
    password: 'OEPpT3Jp1AG3',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};

var client = mqtt.connect('mqtt://m15.cloudmqtt.com', options);
client.on('connect', function () {
    console.log('connected');
    client.subscribe('iluminacao', function () {
        client.on('message', function (topic, message, packet) {
            console.log("Received '" + message + "' on '" + topic + "'");
            iluminacao = message;
        });
    });
});

var buscarIluminacao = function (req, res) {
    res.send(iluminacao);
}

exports.buscarIluminacao = buscarIluminacao;