const Notes = require('../model/notes.model');


exports.getNotes = (__, res) => {
   Notes.find({}).exec((err, notes) => {
       if(err) return res.status(400).json({
           error: 'something went wrong'
       });

       return res.json({
           no_of_notes: notes.length,
           notes
       });
   })
}

exports.addNote = (req, res) => {

    const { title, body } = req.body;

    if(!title || !body) {
        return res.status(400).json({
            error: 'Please add all fileds'
        });
    }

    const notesInstance = new Notes();
    notesInstance.title = title;
    notesInstance.body = body;

    notesInstance.save((err, note) => {
        if(err) return res.status(400).json({
            error: 'something went wrong'
        });

        return res.json({
            message: 'note added successfully.',
            note
        })
    })

}

exports.updateNote = (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;


    if( title.length === 0 || body.length === 0){
       return res.status(400).json({
           error: 'Fields should not be empty'
       });
    }


    Notes.findByIdAndUpdate({ _id: id},{ title: title, body: body }).exec((err, note) => {
        if(err) return res.status(400).json({
            error: 'something went wrong'
        });
 
        return res.json({
            message:'Note updated successfully.',
            note
        });
    });
}

exports.deleteNote = (req, res) => {
    const { id } = req.params;

    Notes.findByIdAndDelete({ _id: id }).exec((err, note)=> {
        if(err) return res.status(400).json({
            error: 'something went wrong'
        });

        return res.json({
            message: 'note deleted successfully.',
            note
        });
    })
}