var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cozinhaSchema = new Schema({
    porta: {
        type: String,
        required: true
    },
    vazao: {
        type: Number,
        required: true
    }
});

var Cozinha = mongoose.model('cozinhadado', cozinhaSchema);

module.exports = Cozinha; 
