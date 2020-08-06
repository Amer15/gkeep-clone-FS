const express = require('express');
const { getNotes, addNote, updateNote, deleteNote } = require('../controllers/notes.controller');
const router = express.Router();


router.get('/', getNotes);

router.post('/add-note', addNote);

router.put('/update-note/:id', updateNote);

router.delete('/delete-note/:id', deleteNote);



module.exports = router;