var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var iluminacaoSchema = new Schema({
    sala: {
        type: String,
        required: true
    },
    quarto: {
        type: String,
        required: true
    },
    cozinha: {
        type: String,
        required: true
    }
});

var Iluminacao = mongoose.model('iluminacaodado', iluminacaoSchema);

module.exports = Iluminacao;