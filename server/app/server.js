var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('dotenv-safe').load();

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(cors());

var usuarioCtrl = require('./usuario/Ctrl');

var mqttIluminacaoCtrl = require('./mqtt/iluminacao/Ctrl');
var mqttIluminacao1Ctrl = require('./mqtt/iluminacao/luz1Ctrl');
var mqttIluminacao2Ctrl = require('./mqtt/iluminacao/luz2Ctrl');
var mqttIluminacao3Ctrl = require('./mqtt/iluminacao/luz3Ctrl');
var mqttJardimCtrl = require('./mqtt/jardim/Ctrl');
var mqttValvulaCtrl = require('./mqtt/jardim/valvulaCtrl');
var mqttCozinhaCtrl = require('./mqtt/cozinha/Ctrl');
var mqttAguaCtrl = require('./mqtt/agua/Ctrl');

var dadosmqttIluminacaoCtrl = require('./iluminacao/Ctrl');
var dadosmqttJardimCtrl = require('./jardim/Ctrl');
var dadosmqttCozinhaCtrl = require('./cozinha/Ctrl');
var dadosmqttAguaCtrl = require('./agua/Ctrl');

app.post('/v1/usuarios', usuarioCtrl.cadastrar);
app.post('/v1/usuarios/auth', usuarioCtrl.autenticar);

app.get('/mqtt/iluminacao', mqttIluminacaoCtrl.buscarIluminacao);
app.get('/mqtt/jardim', mqttJardimCtrl.buscarJardim);
app.get('/mqtt/cozinha', mqttCozinhaCtrl.buscarCozinha);
app.get('/mqtt/agua', mqttAguaCtrl.buscarAgua);
app.post('/mqtt/iluminacao1/config', mqttIluminacao1Ctrl.configIluminacao1);
app.post('/mqtt/iluminacao2/config', mqttIluminacao2Ctrl.configIluminacao2);
app.post('/mqtt/iluminacao3/config', mqttIluminacao3Ctrl.configIluminacao3);
app.post('/mqtt/jardim/config', mqttJardimCtrl.configJardim);
app.post('/mqtt/jardim/valvula/config', mqttValvulaCtrl.configValvula);
app.post('/mqtt/cozinha/config', mqttCozinhaCtrl.configCozinha);
app.post('/mqtt/agua/config', mqttAguaCtrl.configAgua);

app.post('/dadosiluminacao', dadosmqttIluminacaoCtrl.cadastrarIluminacao);
app.post('/dadosjardim', dadosmqttJardimCtrl.cadastrarJardim);
app.post('/dadoscozinha', dadosmqttCozinhaCtrl.cadastrarCozinha);
app.post('/dadosagua', dadosmqttAguaCtrl.cadastrarAgua);

app.get('/dadosiluminacao', dadosmqttIluminacaoCtrl.buscarEstatisticasIluminacao);
app.get('/dadosjardim', dadosmqttJardimCtrl.buscarEstatisticasJardim);
app.get('/dadoscozinha', dadosmqttCozinhaCtrl.buscarEstatisticasCozinha);
app.get('/dadosagua', dadosmqttAguaCtrl.buscarEstatisticasAgua);


app.listen(9000, function () {
    console.log('AutomaHome API');
});