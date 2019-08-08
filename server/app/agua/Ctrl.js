var aguas = require('./aguas');

var cadastrarAgua = function(req, res) {
    var agua = req.body;
    aguas.cadastrarAgua(agua, function(resultado) {
        res.status(201).json(resultado);
    }, function(erro) {
        res.status(400).json(erro);
    });
};

var buscarEstatisticasAgua = function (req, res) {
    aguas.buscarEstatisticasAgua(function (aguas) {
        res.status(200).json(aguas);
    }, function (erro) {
        res.status(400).json(erro);
    });
}

exports.cadastrarAgua = cadastrarAgua;
exports.buscarEstatisticasAgua = buscarEstatisticasAgua;