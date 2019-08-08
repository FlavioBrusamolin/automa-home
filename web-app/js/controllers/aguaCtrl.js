angular.module('automaHome').controller('aguaCtrl', function ($scope, mqtt, dadosmqtt, $rootScope) {
    var agua = function () {
        var promise = mqtt.buscarAgua();
        promise.then(function (response) {
            $scope.agua = response.data;
            console.log(response.data);
            if(response.data.estado == 100) {
                alert('Validade do filtro expirada. Recomenda-se a troca do mesmo.');
            }
            var promise = dadosmqtt.cadastrarAgua(response.data);
            promise.then(function (resultado) {
                buscarEstatisticasAgua();
                console.log('Informacoes de agua armazenadas no banco.');
            });
            promise.catch(function (err) {
                alert('Nao foi possivel realizar o cadastro das informacoes da agua.');
            });
        });
        promise.catch(function (err) {
            alert('Nao foi possivel buscar os dados via MQTT');
        });
    }

    $scope.enviar = function (filtrotrocado, valvula) {
        var promise = mqtt.configAgua(filtrotrocado, valvula);
        promise.then(function (resultado) {
            alert('Configuracoes realizadas com sucesso.');
            $scope.filtrotrocado = {};
            $scope.valvula = 0;
        });
        promise.catch(function (err) {
            alert('Nao foi possivel realizar as configuracoes desejadas.');
        });
    };

    var buscarEstatisticasAgua = function () {
        media_volume = 0;
        total_volume = 0;
        var promise = dadosmqtt.buscarEstatisticasAgua();
        promise.then(function (response) {
            dadosagua = response.data;
            var quant_amostras = Object.keys(response.data);
            var len_amostras = quant_amostras.length;
            for(var i = 0; i < len_amostras; i++) {
                total_volume += dadosagua[i].volume;
            }
            media_volume = total_volume / len_amostras;
            $scope.volumeMedio = media_volume.toFixed(2);
            $scope.amostras = len_amostras;
        });
        promise.catch(function (err) {
            alert('Nao foi possivel buscar as estatisticas de agua.');
        });
    }

    agua();
    chamaAgua = setInterval(agua, 2000);
    $rootScope.reqAgua = chamaAgua;
    clearInterval($rootScope.reqIluminacao);
    clearInterval($rootScope.reqJardim);
    clearInterval($rootScope.reqCozinha);
});