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
});

var configIluminacao2 = function (req, res) {
    console.log(req.body);
    var inteiro = parseInt(req.body.luz2);
    client.publish('configiluminacao2', JSON.stringify(inteiro), function(resultado) {
        console.log("Message is published");
        // client.end();
        res.status(201).json(resultado);
    });
}

exports.configIluminacao2 = configIluminacao2;