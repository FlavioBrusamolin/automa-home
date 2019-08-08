var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var aguaSchema = new Schema({
    volume: {
        type: Number,
        required: true
    },
    estado: {
        type: Number,
        required: true
    }
});

var Agua = mongoose.model('aguadado', aguaSchema);

module.exports = Agua;