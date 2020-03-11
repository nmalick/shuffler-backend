const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const shufflerRoutes = express.Router();
const PORT = 4000;

let ShufflerDB = require('./ShufflerDB.model')

app.use(cors());
app.use(bodyParser.json());

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
            shufflerDB.shufflerDB_songName = req.body.shufflerDB_songName;
            shufflerDB.shufflerDB_artistName = req.body.shufflerDB_artistName;
            shufflerDB.shufflerDB_songGenre = req.body.shufflerDB_songGenre;
            shufflerDB.shufflerDB_songAnalyzed = req.body.shufflerDB_songAnalyzed;

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