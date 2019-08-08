angular.module('automaHome').factory('dadosmqtt', function ($http) {
    var cadastrarAgua = function (dadosagua) {
        return $http.post('http://localhost:9000/dadosagua', dadosagua);
    };

    var cadastrarCozinha = function (dadoscozinha) {
        return $http.post('http://localhost:9000/dadoscozinha', dadoscozinha);
    };

    var cadastrarIluminacao = function (dadosiluminacao) {
        return $http.post('http://localhost:9000/dadosiluminacao', dadosiluminacao);
    };

    var cadastrarJardim = function (dadosjardim) {
        return $http.post('http://localhost:9000/dadosjardim', dadosjardim);
    };

    var buscarEstatisticasIluminacao = function () {
        return $http.get('http://localhost:9000/dadosiluminacao');
    };

    var buscarEstatisticasJardim = function () {
        return $http.get('http://localhost:9000/dadosjardim');
    };

    var buscarEstatisticasCozinha = function () {
        return $http.get('http://localhost:9000/dadoscozinha');
    };

    var buscarEstatisticasAgua = function () {
        return $http.get('http://localhost:9000/dadosagua');
    };

    return {
        cadastrarAgua: cadastrarAgua,
        cadastrarCozinha: cadastrarCozinha,
        cadastrarIluminacao: cadastrarIluminacao,
        cadastrarJardim: cadastrarJardim,
        buscarEstatisticasIluminacao: buscarEstatisticasIluminacao,
        buscarEstatisticasJardim: buscarEstatisticasJardim,
        buscarEstatisticasCozinha: buscarEstatisticasCozinha,
        buscarEstatisticasAgua: buscarEstatisticasAgua
    }
});