const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");

//Route 1: Get all Notes.   Using GET "api/notes/getallnotes".  Login Required
router.get("/getallnotes", fetchuser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

/*  Route 2: Create Note: Using POST "api/notes/addnote" (Login Required)
We input the JWT token containing user.id as a header in the request.
The middleware uses the JWT secret and returns the id of the User in its request file */
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a alid Title").isLength({ min: 3 }),
    body("content", "Enter a valid Note").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {

      //If there are validation errors then return ERROR 400
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, content, tag } = req.body;

      //Creating a new note. User id is fetched from the middleware 'fetchuser'
      const note = new Note({
        title,
        content,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Some Internal Server Error Occured" });
    }
  }
);

//Route : Update Existing Note: Using PUT "/api/notes/update/:id" (Login Reqd)
router.put('/update/:id', fetchuser, async (req, res)=>{
  try {

    const {title, content, tag} = req.body;
    //Create a newNote object
    const newNote = {};
    if(title) {newNote.title= title};
    if(content) {newNote.content= content};
    if(tag) {newNote.tag= tag};

    //Find the note to be updated and update it
    var note = await Note.findById(req.params.id);
    if(!note)  { return res.status(400).json({error:"Note to be updated not found"})}
    if (note.user.toString() !== req.user.id) { return res.status(401).send("Try to access your own notes")}

    note  = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json(note);
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
}) 

//Route : Deleting a Note: Using DELETE '/api/notes/delete/:id' (Login Reqd)
router.delete('/delete/:id',fetchuser, async (req, res)=>{

  try {
    var note = await Note.findById(req.params.id);
    if(!note) { return res.status(400).json({error:"The requested note doesnt exist"}) }
    if(note.user.toString()!==req.user.id){return res.status(401).json({error:"kindly try to delete your own note"})}
    note = await Note.findByIdAndDelete(req.params.id);
    return res.send("Successfully deleted the note")

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


})



module.exports = router;