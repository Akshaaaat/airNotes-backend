const mongoose=require('mongoose');
const { mongo } = require('mongoose');
const mongoURI = "mongodb://localhost:27017/airnotes-backend";

const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo succesfully");
    })
}

module.exports= connectToMongo;