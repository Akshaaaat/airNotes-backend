const mongoose= require('mongoose');
const { Schema } = mongoose;

const notesSchema= new mongoose.Schema({
    title:{
        type:string,
        required:true
    },
    content:{
        type:string,
        requred:true
    },
    tag:{
        type:string,
    },
    date:{
        type:Date
    }
});
modeule.exports = mongoose.model('Notes', notesSchema);