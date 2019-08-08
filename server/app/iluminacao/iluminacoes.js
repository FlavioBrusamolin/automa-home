var Iluminacao = require('./modelo');

var cadastrarIluminacao = function(dadosiluminacao, quandoSalvar, quandoDerErro) {
    new Iluminacao(dadosiluminacao).save(function(err, resultados) {
        if(err) {
            quandoDerErro(err);
        }
        else {
            quandoSalvar(resultados);
        }
    });
}

var buscarEstatisticasIluminacao = function (quandoListar, quandoDerErro) {
    Iluminacao.find()
        .select({ sala: true, quarto: true, cozinha: true, _id: false })
        .exec(function (err, iluminacoes) {
            if (err) {
                quandoDerErro(err);
            }
            else {
                quandoListar(iluminacoes);
            }
        });
}

exports.cadastrarIluminacao = cadastrarIluminacao;
exports.buscarEstatisticasIluminacao = buscarEstatisticasIluminacao;