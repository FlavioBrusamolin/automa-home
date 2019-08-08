var jardins = require('./jardins');

var cadastrarJardim = function(req, res) {
    var jardim = req.body;
    jardins.cadastrarJardim(jardim, function(resultado) {
        res.status(201).json(resultado);
    }, function(erro) {
        res.status(400).json(erro);
    });
};

var buscarEstatisticasJardim = function (req, res) {
    jardins.buscarEstatisticasJardim(function (jardins) {
        res.status(200).json(jardins);
    }, function (erro) {
        res.status(400).json(erro);
    });
}

exports.cadastrarJardim = cadastrarJardim;
exports.buscarEstatisticasJardim = buscarEstatisticasJardim;