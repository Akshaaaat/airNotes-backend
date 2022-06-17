const mongoose=require('mongoose');
const { Schema } = mongoose;

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    pwd:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports =mongoose.model('User', userSchema);