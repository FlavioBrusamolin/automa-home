angular.module('automaHome').factory('mqtt', function ($http) {
    var buscarIluminacao = function () {
        return $http.get('http://localhost:9000/mqtt/iluminacao');
    };

    var buscarJardim = function () {
        return $http.get('http://localhost:9000/mqtt/jardim');
    };

    var buscarCozinha = function () {
        return $http.get('http://localhost:9000/mqtt/cozinha');
    };

    var buscarAgua = function () {
        return $http.get('http://localhost:9000/mqtt/agua');
    };

    var configIluminacao1 = function (luz1) {
        var configs = { luz1: luz1 };
        return $http.post('http://localhost:9000/mqtt/iluminacao1/config', configs);
    };

    var configIluminacao2 = function (luz2) {
        var configs = { luz2: luz2 };
        return $http.post('http://localhost:9000/mqtt/iluminacao2/config', configs);
    };

    var configIluminacao3 = function (luz3) {
        var configs = { luz3: luz3 };
        return $http.post('http://localhost:9000/mqtt/iluminacao3/config', configs);
    };

    var configJardim = function (umidade) {
        var configs = { umidade: umidade };
        return $http.post('http://localhost:9000/mqtt/jardim/config', configs);
    };

    var configValvula = function (valvula) {
        var configs = { valvula: valvula };
        return $http.post('http://localhost:9000/mqtt/jardim/valvula/config', configs);
    };

    var configCozinha = function (temperatura) {
        return $http.post('http://localhost:9000/mqtt/cozinha/config', temperatura);
    };

    var configAgua = function (filtrotrocado, valvula) {
        var configs = { filtrotrocado: filtrotrocado, valvula: valvula };
        return $http.post('http://localhost:9000/mqtt/agua/config', configs);
    };

    return {
        buscarIluminacao: buscarIluminacao,
        buscarJardim: buscarJardim,
        buscarCozinha: buscarCozinha,
        buscarAgua: buscarAgua,
        configCozinha: configCozinha,
        configAgua: configAgua,
        configIluminacao1: configIluminacao1,
        configIluminacao2: configIluminacao2,
        configIluminacao3: configIluminacao3,
        configJardim: configJardim,
        configValvula: configValvula
    }
});