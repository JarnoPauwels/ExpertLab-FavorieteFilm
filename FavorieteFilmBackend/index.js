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

// GET endpoint to fetch the watchlist
app.get('/watchlist', async (req, res) => {
    try {
        await client.connect();

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
    } finally {
        await client.close();
    }
});

// POST endpoint to add a movie to the watchlist
app.post('/watchlist', async (req, res) => {
    try {
        await client.connect();
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
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
console.log(`Server is listening on port ${port}`);
});