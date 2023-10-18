const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ObjectID} = require('mongodb');
const bodyParser = require('body-parser');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI);
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());

client.connect()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// GET endpoint to fetch the watchlist
app.get('/watchlist', async (req, res) => {
    try {
        const colli = client.db('expertlab').collection('watchlist');
        const pll = await colli.find({}).toArray();

        res.status(200).send(pll);
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            error: 'Something went wrong',
            value: error
        });
    }
});

// POST endpoint to add a movie to the watchlist
app.post('/watchlist', async (req, res) => {
    try {
        const colli = client.db('expertlab').collection('watchlist');

        let newMovie = {
            movie_id: req.body.movie_id,
            title: req.body.title,
            description: req.body.description,
            poster: req.body.poster,
            watched: false,
        }

        const query = { movie_id: newMovie.movie_id}
        const movie = await colli.findOne(query)

        if(movie){
            if(movie.movie_id == newMovie.movie_id){
                res.status(401).send({
                    status: "Error",
                    message: "Movie is already in watchlist!"
                })   
            }
            return
        }else{
            const insertResult = await colli.insertOne(newMovie);
            res.status(200).send({
                status: "Successfull",
                message: "Movie added to watchlist",
                data: insertResult
            })  
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: 'Something went wrong',
            value: error
        });
    }
});

// DELETE endpoint to remove a movie from the watchlist by movie_id
app.delete('/watchlist/:movie_id', async (req, res) => {
    try {
        const colli = client.db('expertlab').collection('watchlist');

        const movieId = parseInt(req.params.movie_id);;
    
        const query = { movie_id: movieId };
        
        const result = await colli.deleteOne(query);

        if (result.deletedCount > 0){
            res.status(200).send('Deleted movie with id: ' + movieId);
            return;
        }else{
            res.status(400).send('Could not find movie with id: ' + movieId);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: 'Something went wrong',
            value: error
        });
    }
});

process.on('SIGINT', () => {
client.close()
    .then(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
    });
});

app.listen(port, () => {
console.log(`Server is listening on port ${port}`);
});