angular.module('automaHome').controller('cozinhaCtrl', function ($scope, mqtt, dadosmqtt, $rootScope) {
    var cozinha = function () {
        var promise = mqtt.buscarCozinha();
        promise.then(function (response) {
            $scope.cozinha = response.data;
            console.log(response.data);
            if(response.data.vazao == 1 && response.data.avisoporta == 0) {
                alert('Foi detectado vazamento de g\u00e1s!');
            }
            else if(response.data.vazao == 0 && response.data.avisoporta == 1) {
                alert('A porta da geladeira est\u00e1 aberta h\u00e1 muito tempo!');
            }
            else if(response.data.vazao == 1 && response.data.avisoporta == 1) {
                alert('Foi detectado vazamento de g\u00e1s e a porta da geladeira est\u00e1 aberta h\u00e1 muito tempo!');
            }
            else{
                console.log('Nenhum aviso a ser dado.');
            }
            var promise = dadosmqtt.cadastrarCozinha(response.data);
            promise.then(function (resultado) {
                buscarEstatisticasCozinha();
                console.log('Informacoes da cozinha armazenadas no banco.');
            });
            promise.catch(function (err) {
                alert('Nao foi possivel realizar o cadastro das informacoes da cozinha.');
            });
        });
        promise.catch(function (err) {
            alert('Nao foi possivel buscar os dados via MQTT');
        });
    }

    $scope.enviar = function (temperatura) {
        var promise = mqtt.configCozinha(temperatura);
        promise.then(function (resultado) {
            alert('Temperatura minima e maxima configuradas com sucesso.');
            $scope.temperatura = {};
        });
        promise.catch(function (err) {
            alert('Nao foi possivel configurar as temperaturas.');
        });
    };

    var buscarEstatisticasCozinha = function () {
        cont_porta = 0;
        cont_vazao = 0;
        var promise = dadosmqtt.buscarEstatisticasCozinha();
        promise.then(function (response) {
            dadoscozinha = response.data;
            var quant_amostras = Object.keys(response.data);
            var len_amostras = quant_amostras.length;
            for(var i = 0; i < len_amostras; i++) {
                if(dadoscozinha[i].porta == 'Opened') {
                    cont_porta++;
                }
                if(dadoscozinha[i].vazao == 1) {
                    cont_vazao++;
                }
            }
            $scope.estatisticaPorta = ((cont_porta / len_amostras) * 100).toFixed(2);
            $scope.estatisticaVazao = cont_vazao;
            $scope.amostras = len_amostras;
        });
        promise.catch(function (err) {
            alert('Nao foi possivel buscar as estatisticas da cozinha.');
        });
    }

    cozinha();
    chamaCozinha = setInterval(cozinha, 2000);
    $rootScope.reqCozinha = chamaCozinha;
    clearInterval($rootScope.reqIluminacao);
    clearInterval($rootScope.reqAgua);
    clearInterval($rootScope.reqJardim);
});