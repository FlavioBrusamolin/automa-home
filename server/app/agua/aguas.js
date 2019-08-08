var Agua = require('./modelo');

var cadastrarAgua = function(dadosagua, quandoSalvar, quandoDerErro) {
    new Agua(dadosagua).save(function(err, resultados) {
        if(err) {
            quandoDerErro(err);
        }
        else {
            quandoSalvar(resultados);
        }
    });
}

var buscarEstatisticasAgua = function (quandoListar, quandoDerErro) {
    Agua.find()
        .select({ volume: true, estado: true, _id: false })
        .exec(function (err, aguas) {
            if (err) {
                quandoDerErro(err);
            }
            else {
                quandoListar(aguas);
            }
        });
}

exports.cadastrarAgua = cadastrarAgua;
exports.buscarEstatisticasAgua = buscarEstatisticasAgua;