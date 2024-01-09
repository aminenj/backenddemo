const mongoose = require('mongoose');
const moment = require('moment');

const RsvSchema = new mongoose.Schema({

    idsalle: {
        type: String,
        required: true
    },
    iduser: {
        type: String,
        required: true
    },
    date_debut: {
        type: Date,
        required: true,
        default: () => moment().toDate()
    },
    date_fin: {
        type: Date,
        required: true,
        default: () => moment().toDate()
    },
    disponibilite: {
        type: String,
        required: true
    }
});

const Rsv = mongoose.model('Rsv', RsvSchema);

module.exports = Rsv;
