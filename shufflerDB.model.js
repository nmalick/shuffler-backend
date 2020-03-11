const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ShufflerDB = new Schema({
    shufflerDB_songName: {
        type: String
    },
    shufflerDB_artistName: {
        type: String
    },
    shufflerDB_songGenre: {
        type: String
    },
    shufflerDB_songAnalyzed: {
        type: Boolean
    }
});

module.exports = mongoose.model('ShufflerDB', ShufflerDB);