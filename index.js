const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const notesRoutes = require('./server/routes/notes');
require('dotenv').config();
const app = express();
const path = require('path');

const PORT = process.env.PORT ||  process.env.NODE_PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
    app.use(cors())
}
else{
    app.use(morgan('combined'));
}

mongoose.connect( process.env.MONGODB_URL ,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify: true
},() => console.log(`MongoDB connected`));

app.use('/api/notes', notesRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
    //Relative path 
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
});
}


app.listen(PORT, () => console.log(`Server started at PORT: ${PORT} `));