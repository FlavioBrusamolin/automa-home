angular.module('automaHome').controller('jardimCtrl', function ($scope, mqtt, dadosmqtt, $rootScope) {
    var jardim = function () {
        var promise = mqtt.buscarJardim();
        promise.then(function (response) {
            $scope.jardim = response.data;
            console.log(response.data);
            var promise = dadosmqtt.cadastrarJardim(response.data);
            promise.then(function (resultado) {
                buscarEstatisticasJardim();
                console.log('Informacoes do jardim armazenadas no banco.');
            });
            promise.catch(function (err) {
                alert('Nao foi possivel realizar o cadastro das informacoes do jardim.');
            });
        });
        promise.catch(function (err) {
            alert('Nao foi possivel buscar os dados via MQTT');
        });
    }

    $scope.enviar = function (umidade) {
        var promise = mqtt.configJardim(umidade);
        promise.then(function (resultado) {
            alert('Umidade minima configurada com sucesso.');
            $scope.umidade = 0;
        });
        promise.catch(function (err) {
            alert('Nao foi possivel configurar a umidade minima.');
        });
    };

    
    $scope.ligarvalvula = function () {
        var valvula = 1;
        var promise = mqtt.configValvula(valvula);
        promise.then(function (resultado) {
            alert('Valvula ligada com sucesso.');
        });
        promise.catch(function (err) {
            alert('Nao foi possivel ligar a valvula.');
        });
    };

    $scope.desligarvalvula = function () {
        var valvula = 0;
        var promise = mqtt.configValvula(valvula);
        promise.then(function (resultado) {
            alert('Valvula desligada com sucesso.');
        });
        promise.catch(function (err) {
            alert('Nao foi possivel desligar a valvula.');
        });
    };

    var buscarEstatisticasJardim = function () {
        cont_valvula = 0;
        media_umidade = 0;
        total_umidade = 0;
        media_pH = 0;
        total_pH = 0;
        var promise = dadosmqtt.buscarEstatisticasJardim();
        promise.then(function (response) {
            dadosjardim = response.data;
            var quant_amostras = Object.keys(response.data);
            var len_amostras = quant_amostras.length;
            for(var i = 0; i < len_amostras; i++) {
                if(dadosjardim[i].valvula == 'ON') {
                    cont_valvula++;
                }
                total_umidade += dadosjardim[i].umidade;
                total_pH += dadosjardim[i].pH;
            }
            media_umidade = total_umidade / len_amostras;
            media_pH = total_pH / len_amostras;
            $scope.estatisticaValvula = ((cont_valvula / len_amostras) * 100).toFixed(2);
            $scope.umidadeMedia = media_umidade.toFixed(2);
            $scope.pHMedio = media_pH.toFixed(2);
            $scope.amostras = len_amostras;
        });
        promise.catch(function (err) {
            alert('Nao foi possivel buscar as estatisticas da cozinha.');
        });
    }

    jardim();
    chamaJardim = setInterval(jardim, 2000);
    $rootScope.reqJardim = chamaJardim;
    clearInterval($rootScope.reqIluminacao);
    clearInterval($rootScope.reqAgua);
    clearInterval($rootScope.reqCozinha);
});