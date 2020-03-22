const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const shufflerRoutes = express.Router();
const PORT = 4000;

let ShufflerDB = require('./ShufflerDB.model')

app.use(cors());
app.use(bodyParser.json({ limit: Infinity }));

mongoose.connect('mongodb://127.0.0.1:27017/shuffler', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

shufflerRoutes.route('/').get(function(req,res) {
    ShufflerDB.find(function(err, shuffler) {
        if(err){
            console.log(err);
        }else{
            res.json(shuffler);
        }
    });
});

shufflerRoutes.route('/add').post(function(req, res) {
    let shufflerDB = new ShufflerDB(req.body);
    shufflerDB.save()
        .then(shufflerDB => {
            res.status(200).json({'shufflerDB': 'shufflerDB added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new shufflerDB failed');
        });
});

shufflerRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    ShufflerDB.findById(id, function(err, shufflerDB) {
        res.json(shufflerDB);
    });
});

shufflerRoutes.route('/update/:id').post(function(req, res) {
    ShufflerDB.findById(req.params.id, function(err, shufflerDB) {
        if (!shufflerDB)
            res.status(404).send("data is not found");
        else
            shufflerDB.newPlaylist = req.body.newPlaylist;
            // shufflerDB.songName = req.body.songName;
            // shufflerDB.artists = req.body.artists;
            // shufflerDB.bars = req.body.bars;
            // shufflerDB.beats = req.body.beats;
            // shufflerDB.sections = req.body.sections;
            // shufflerDB.segments = req.body.segments;
            // shufflerDB.songPopularity = req.body.songPopularity;
            // shufflerDB.duration = req.body.duration;
            // shufflerDB.key = req.body.key;
            // shufflerDB.mode = req.body.mode;
            // shufflerDB.acousticness = req.body.acousticness;
            // shufflerDB.danceability = req.body.danceability;
            // shufflerDB.energy = req.body.energy;
            // shufflerDB.loudness = req.body.loudness;
            // shufflerDB.valence = req.body.valence;
            // shufflerDB.tempo = req.body.tempo;
            // shufflerDB.genres = req.body.genres;
            // shufflerDB.artistPopularity = req.body.artistPopularity;


            shufflerDB.save().then(shufflerDB => {
                res.json('ShufflerDB updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


app.use('/shuffler', shufflerRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});