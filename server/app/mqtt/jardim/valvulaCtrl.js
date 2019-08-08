var mqtt = require('mqtt');

var options = {
    port: 16021,
    host: 'mmqtt://m15.cloudmqtt.com',
    clientId: 'AC326' + Math.random().toString(16).substr(2, 8),
    username: 'vildffge',
    password: 'x3YrXxhrVASg',
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
});

var configValvula = function (req, res) {
    console.log(req.body);
    client.publish('configvalvula', JSON.stringify(req.body), function(resultado) {
        console.log("Message is published");
        // client.end();
        res.status(201).json(resultado);
    });
}

exports.configValvula = configValvula;