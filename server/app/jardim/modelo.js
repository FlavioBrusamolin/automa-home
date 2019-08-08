var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jardimSchema = new Schema({
    umidade: {
        type: Number,
        required: true
    },
    pH: {
        type: Number,
        required: true
    },
    valvula: {
        type: String,
        required: true
    }
});

var Jardim = mongoose.model('jardimdado', jardimSchema);

module.exports = Jardim;