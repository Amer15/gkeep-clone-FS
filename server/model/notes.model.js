const { Schema, model } = require('mongoose');

const NotesSchema = new Schema({
    title:{
        type: String,
        required: [true, 'Please provide a title for the note'],
        minlength: 4
    },
    body:{
        type: String,
        required: [true, 'Please provide the body of the note'],
        minlength: 4
    }
})

module.exports = model('Note', NotesSchema);