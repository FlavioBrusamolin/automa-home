var cozinhas = require('./cozinhas');

var cadastrarCozinha = function(req, res) {
    var cozinha = req.body;
    cozinhas.cadastrarCozinha(cozinha, function(resultado) {
        res.status(201).json(resultado);
    }, function(erro) {
        res.status(400).json(erro);
    });
};

var buscarEstatisticasCozinha = function (req, res) {
    cozinhas.buscarEstatisticasCozinha(function (cozinhas) {
        res.status(200).json(cozinhas);
    }, function (erro) {
        res.status(400).json(erro);
    });
}

exports.cadastrarCozinha = cadastrarCozinha;
exports.buscarEstatisticasCozinha = buscarEstatisticasCozinha;