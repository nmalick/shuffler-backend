const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ShufflerDB = new Schema({
    songToAdd:{
        type: newSong = {
            songName: {
                type: String
            },
            trackID: {
                type: String
            },
            playlists: {
                array: PlaylistArray = {
                    type: playlistObject={
                        playlistName: String,
                        playlistId: String
                    }
                }
            },
            artists: {
                array: ArtistsArray = {
                    href: String,
                    id: String,
                    name: String,
                    type: String,
                    uri: String
                }
            },
            songPopularity: {
                type: Number
            },
            bars: {
                type: Bars = {
                    start: Number,
                    duration: Number,
                    confidence: Number
                }
            },
            beats: {
                type: Beats = {
                    start: Number,
                    duration: Number,
                    confidence: Number
                }
            },
            sections: {
                type: Sections = {
                    start: Number,
                    duration: Number,
                    confidence: Number,
                    loudness: Number,
                    tempo: Number,
                    tempo_confidence: Number,
                    key: Number,
                    key_confidence: Number,
                    mode: Number,
                    mode_confidence: Number,
                    time_signature: Number,
                    time_signature_confidence: Number
                }
            },
            segments: {
                type: Segments = {
                        start: Number,
                        duration: Number,
                        confidence: Number,
                        loudness_start: Number,
                        loudness_max_time: Number,
                        loudness_max: Number,
                        loudness_end: Number,
                        pitches:{
                            array: Number
                        } , 
                        timbre: {
                            array: Number
                        }
                    }
            },
            duration: {
                type: Number
            },
            key: {
                type: Number
            },
            mode: {
                type: Number
            },
            acousticness: {
                type: Number
            },
            danceability: {
                type: Number
            },
            energy: {
                type: Number
            },
            loudness: {
                type: Number
            },
            valence: {
                type: Number
            },
            tempo: {
                type: Number
            },
            artistGenres: {
                array: String,
            },
            artistPopularity: {
                type: Number
            }
        }
    }
});

module.exports = mongoose.model('ShufflerDB', ShufflerDB);