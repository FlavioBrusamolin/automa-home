var Cozinha = require('./modelo');

var cadastrarCozinha = function(dadoscozinha, quandoSalvar, quandoDerErro) {
    new Cozinha(dadoscozinha).save(function(err, resultados) {
        if(err) {
            quandoDerErro(err);
        }
        else {
            quandoSalvar(resultados);
        }
    });
}

var buscarEstatisticasCozinha = function (quandoListar, quandoDerErro) {
    Cozinha.find()
        .select({ porta: true, vazao: true, _id: false })
        .exec(function (err, cozinhas) {
            if (err) {
                quandoDerErro(err);
            }
            else {
                quandoListar(cozinhas);
            }
        });
}

exports.cadastrarCozinha = cadastrarCozinha;
exports.buscarEstatisticasCozinha = buscarEstatisticasCozinha;