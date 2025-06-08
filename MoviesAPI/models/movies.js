                const mongoose = require("mongoose");
                const movieSchema = new mongoose.Schema({
                    
                title:{type:String,required:true, unique:true},
                director:String,
                year:Number
                },{collection:'movies'});

                module.exports = mongoose.model('Movie',movieSchema)             