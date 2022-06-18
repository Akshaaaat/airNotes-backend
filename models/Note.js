const mongoose= require('mongoose');
const { Schema } = mongoose;

const notesSchema= new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        requred:true
    },
    tag:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
});
module.exports = mongoose.model('Notes', notesSchema);