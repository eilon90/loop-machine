const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordingSchema = new Schema({
    name: String,
    userName: String,
    openingPlaylist: [Number],
    duration: Date,
    recordEvents: [{
        button: String,
        newStatus: String,
        time: Date
    }]
})

const Recording = mongoose.model('Recording', recordingSchema);
module.exports = Recording;