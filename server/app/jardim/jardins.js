var Jardim = require('./modelo');

var cadastrarJardim = function(dadosjardim, quandoSalvar, quandoDerErro) {
    new Jardim(dadosjardim).save(function(err, resultados) {
        if(err) {
            quandoDerErro(err);
        }
        else {
            quandoSalvar(resultados);
        }
    });
}

var buscarEstatisticasJardim = function (quandoListar, quandoDerErro) {
    Jardim.find()
        .select({ umidade: true, pH: true, valvula: true, _id: false })
        .exec(function (err, jardins) {
            if (err) {
                quandoDerErro(err);
            }
            else {
                quandoListar(jardins);
            }
        });
}

exports.cadastrarJardim = cadastrarJardim;
exports.buscarEstatisticasJardim = buscarEstatisticasJardim;