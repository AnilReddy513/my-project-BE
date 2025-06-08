const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/movies');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
 

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongoDB connect")
}).catch((err)=>{
    console.log("errpor",err)
})


app.get('/movies', async (req,res)=>{
    try{
        const search = req.query.search || '';
        const movieList = await Movie.find({title:{$regex:search,$options:'i'}}).sort({_id:1}).limit(20);
        console.log(movieList, "movielist");
        
        res.json(movieList);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
});

app.post('/movies', async (req, res)=>{

    const movies = req.body;
    if(!Array.isArray(movies)){
        //return res.status(400).json({message:"invalid req"})
     movies=[movies];
    }
  let  inserted =[]
    try{

        for(const movie of movies){
            if(!movie.title){
              continue;
            }
           const exists = await Movie.findOne({title:movie.title});

           if(!exists){
  const created =   await Movie.create(movie);
  inserted.push(created)
     
           }
        }
        res.status(201).json({message:"inserts "})

        
            //   const movie = new Movie(req.body);
            //   const saveMovie = await movie.save();
            //   res.status(201).json(saveMovie);
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
});


app.listen(5000, ()=>{
    console.log("server running at 5000")
})