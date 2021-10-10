const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const { find } = require("../models/Note");

// ROUTER 1 : Get all the Notes : "/api/note/fetchallnotes". Login required :  using: GET

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    // Note me jo [id aayegi req ke thrru aai hai ] use notes me find karenge
    const notes = await Note.find({ user: req.user.id });
    // Response me sabhi Notes dedenge
    res.json(notes);
    
  } catch (error) {
    res.status(500).send("Internal Error Occured");
    console.log(error);
  }
});


// ROUTER 2 : Add a New Notes : "/api/note/addnotes". Login required :  using: POST

router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter the valid name").isLength({ min: 3 }),
    body("description", "Enter the valid password").isLength({ min: 5 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;

      // Adding New notes in Database
      const note = new Note({
        user: req.user.id, // Fetchuser me jo user ki id hai to notes me vhi [is notes k user: me save ho jaegi] jisse ham usi id k sare notes fetch kara skte hai
        title,
        description,
        tag,
      });
      const saveNote = await note.save();

      res.json(saveNote);

    } catch (error) {
      res.status(500).send("Internal Error Occured");
      console.log(error);
    }
  }
);


// ROUTER 3 : Update the Notes : "/api/note/updatenotes/:id". Login required :  using: PUT

router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  // Geting updated notes fildes
  const { title, description, tag } = req.body;

  // Create a new Note
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  try {
    // Find the note by id
    let note = await Note.findById(req.params.id);

    // Find the Note is exist  or not
    if (!note) {
      res.status(404).json({ error: "the note is not exist " });
    }

    // If the Note is exist :- Then check User can Update only their own Notes
    if (note.user.toString() !== req.user.id) {
      res.status(404).send("Not Allowed");
    }

    // If User is Correct Then we can Update this Note
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);

  } catch (error) {
    res.status(500).send("Internal Error Occured");
    // console.log(error);
  }
});


// ROUTER 4 : Delete the Notes : "/api/note/deletenotes/:id". Login required :  using: DELETE

router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  try {
    // Find the note by id
    let note = await Note.findById(req.params.id);

    // Find the Note is exist  or not
    if (!note) {
      res.status(404).json({ error: "the note is not exist " });
    }

    // If the Note is exist :- Then check User can Delete only his own Notes
    if (note.user.toString() !== req.user.id) {
      res.status(404).send("Not Allowed");
    }

    // If User is Correct Then we can Delete this Note
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ "success ": "The item will be deleted", note });

  } catch (error) {
    res.status(500).send("Internal Error Occured");
    console.log(error);
  }
});

module.exports = router;
