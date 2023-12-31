const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');
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
            score: 0,
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

        const movieId = parseInt(req.params.movie_id);
    
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

// PUT endpoint to update the 'watched' status of a movie
app.put('/watchlist/:movie_id', async (req, res) => {
    try {
      const colli = client.db('expertlab').collection('watchlist');
  
      const movieId = parseInt(req.params.movie_id); 
  
      const query = { movie_id: movieId };
      const update = { $set: { watched: true } };
  
      const result = await colli.updateOne(query, update);
  
      if (result.modifiedCount > 0) {
        res.status(200).send('Movie watched status updated successfully');
      } else {
        res.status(400).send('Could not update movie watched status');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: 'Something went wrong',
        value: error
      });
    }
});

app.put('/watchlist/:movie_id/rate', async (req, res) => {
  try {
    const movie_id = parseInt(req.params.movie_id, 10); // Convert the string to an integer
    const { score } = req.body;

    // Update the movie's score in the database.
    const colli = client.db('expertlab').collection('watchlist');
    const result = await colli.updateOne({ movie_id }, { $set: { score } });

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Movie rated successfully' });
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong', value: error });
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