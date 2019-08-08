var mqtt = require('mqtt');

var options = {
    port: 15874,
    host: 'mmqtt://m15.cloudmqtt.com',
    clientId: 'AC326' + Math.random().toString(16).substr(2, 8),
    username: 'wwbnjkbo',
    password: 'YWm1ONxslLw4',
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
    client.subscribe('cozinha', function () {
        client.on('message', function (topic, message, packet) {
            console.log("Received '" + message + "' on '" + topic + "'");
            cozinha = message;
        });
    });
});

var buscarCozinha = function (req, res) {
    res.send(cozinha);
}

var configCozinha = function (req, res) {
    console.log(req.body);
    client.publish('configcozinha', JSON.stringify(req.body), function(resultado) {
        console.log("Message is published");
        // client.end();
        res.status(201).json(resultado);
    });
}

exports.buscarCozinha = buscarCozinha;
exports.configCozinha = configCozinha;