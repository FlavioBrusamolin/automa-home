var iluminacoes = require('./iluminacoes');

var cadastrarIluminacao = function(req, res) {
    var iluminacao = req.body;
    iluminacoes.cadastrarIluminacao(iluminacao, function(resultado) {
        res.status(201).json(resultado);
    }, function(erro) {
        res.status(400).json(erro);
    });
};

var buscarEstatisticasIluminacao = function (req, res) {
    iluminacoes.buscarEstatisticasIluminacao(function (iluminacoes) {
        res.status(200).json(iluminacoes);
    }, function (erro) {
        res.status(400).json(erro);
    });
}

exports.cadastrarIluminacao = cadastrarIluminacao;
exports.buscarEstatisticasIluminacao = buscarEstatisticasIluminacao;