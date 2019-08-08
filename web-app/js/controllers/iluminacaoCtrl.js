angular.module('automaHome').controller('iluminacaoCtrl', function ($scope, mqtt, dadosmqtt, $rootScope) {
    var iluminacao = function () {
        var promise = mqtt.buscarIluminacao();
        promise.then(function (response) {
            $scope.iluminacao = response.data;
            console.log(response.data);
            var promise = dadosmqtt.cadastrarIluminacao(response.data);
            promise.then(function (resultado) {
                buscarEstatisticasLuz();
                console.log('Informacoes da iluminacao armazenadas no banco.');
            });
            promise.catch(function (err) {
                alert('Nao foi possivel realizar o cadastro das informacoes da iluminacao.');
            });
        });
        promise.catch(function (err) {
            alert('Nao foi possivel buscar os dados via MQTT');
        });
    }

    $scope.ligarluz1 = function () {
        var luz1 = 1;
        var promise = mqtt.configIluminacao1(luz1);
        promise.then(function (resultado) {
            alert('Luz da sala acesa com sucesso.');
        });
        promise.catch(function (err) {
            alert('Nao foi possivel acender a luz da sala.');
        });
    };

    $scope.desligarluz1 = function () {
        var luz1 = 0;
        var promise = mqtt.configIluminacao1(luz1);
        promise.then(function (resultado) {
            alert('Luz da sala apagada com sucesso.');
        });
        promise.catch(function (err) {
            alert('Nao foi possivel apagar a luz da sala.');
        });
    };

    $scope.ligarluz2 = function () {
        var luz2 = 1;
        var promise = mqtt.configIluminacao2(luz2);
        promise.then(function (resultado) {
            alert('Luz do quarto acesa com sucesso.');
        });
        promise.catch(function (err) {
            alert('Nao foi possivel acender a luz do quarto.');
        });
    };

    $scope.desligarluz2 = function () {
        var luz2 = 0;
        var promise = mqtt.configIluminacao2(luz2);
        promise.then(function (resultado) {
            alert('Luz do quarto apagada com sucesso.');
        });
        promise.catch(function (err) {
            alert('Nao foi possivel apagar a luz do quarto.');
        });
    };

    $scope.ligarluz3 = function () {
        var luz3 = 1;
        var promise = mqtt.configIluminacao3(luz3);
        promise.then(function (resultado) {
            alert('Luz da cozinha acesa com sucesso.');
        });
        promise.catch(function (err) {
            alert('Nao foi possivel acender a luz da cozinha.');
        });
    };

    $scope.desligarluz3 = function () {
        var luz3 = 0;
        var promise = mqtt.configIluminacao3(luz3);
        promise.then(function (resultado) {
            alert('Luz da cozinha apagada com sucesso.');
        });
        promise.catch(function (err) {
            alert('Nao foi possivel apagar a luz da cozinha.');
        });
    };

    var buscarEstatisticasLuz = function () {
        cont_sala = 0;
        cont_quarto = 0;
        cont_cozinha = 0;
        var promise = dadosmqtt.buscarEstatisticasIluminacao();
        promise.then(function (response) {
            dadosiluminacao = response.data;
            var quant_amostras = Object.keys(response.data);
            var len_amostras = quant_amostras.length;
            for(var i = 0; i < len_amostras; i++) {
                if(dadosiluminacao[i].sala == 'ON') {
                    cont_sala++;
                }
                if(dadosiluminacao[i].quarto == 'ON') {
                    cont_quarto++;
                }
                if(dadosiluminacao[i].cozinha == 'ON') {
                    cont_cozinha++;
                }
            }
            $scope.estatisticaSala = ((cont_sala / len_amostras) * 100).toFixed(2);
            $scope.estatisticaQuarto = ((cont_quarto / len_amostras) * 100).toFixed(2);
            $scope.estatisticaCozinha = ((cont_cozinha / len_amostras) * 100).toFixed(2);
        });
        promise.catch(function (err) {
            alert('Nao foi possivel buscar as estatisticas da iluminacao.');
        });
    }

    iluminacao();
    chamaIluminacao = setInterval(iluminacao, 2000);
    $rootScope.reqIluminacao = chamaIluminacao;
    clearInterval($rootScope.reqJardim);
    clearInterval($rootScope.reqAgua);
    clearInterval($rootScope.reqCozinha);
});