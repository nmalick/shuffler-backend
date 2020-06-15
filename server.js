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

shufflerRoutes.route('/findbyDbId/:DbId').get(function(req, res) {
    let DbId = req.params.DbId;
    ShufflerDB.findById(DbId, function(err, shufflerDB) {
        res.json(shufflerDB);
    })
    .then(shufflerDB => {
        res.status(200).json({'shufflerDB': 'shufflerDB added successfully'});
    })
    .catch(err => {
        res.status(400).send('adding new shufflerDB failed');
    });
});

shufflerRoutes.route('/findbyTrackId/:trackId').get(function(req, res) {
    let trackId = req.params.trackId;
    ShufflerDB.find({'songToAdd.trackID':{$eq: trackId}}, function(err, shufflerDB) {
        res.json(shufflerDB);
        })
        .then(shufflerDB => {
            res.status(200).json({'shufflerDB': 'shufflerDB added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new shufflerDB failed');
        });
});

shufflerRoutes.route('/updatePlaylistsByTrackId/:trackId').post(function(req, res) {
        let trackId = req.params.trackId;

        ShufflerDB.findOneAndUpdate({'songToAdd.trackID':{$eq: trackId}},
        {$push: {'songToAdd.playlists': req.body}}, 
        {returnNewDocument :true})
        .then(shufflerDB => {
            res.status(200).json({'shufflerDB': 'Succesfully updated Playlist IDs'});
        })
        .catch(err => {
            res.status(400).send('updating Playlist IDs failed');
        });

});


app.use('/shuffler', shufflerRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});