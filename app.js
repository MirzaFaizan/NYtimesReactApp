const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const ArtilceRoutes = require('./api/routes/articleRouter');
const mongoose = require('mongoose');
var path = require('path');

var router = express.Router();

//change your DB url here
const mongoURI = 'mongodb://localhost:27017/nytreact';


// setting up Middle ware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));
//setting up mongoDB connection

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI).catch((error) => {
    console.log("Exception \n"+error);
  });
mongoose.connection.on('error',function(){
    console.log("Could not connect to DB, exiting now. ");
    process.exit();
});
mongoose.connection.once('open',function(){
    console.log("Connected to MongoDB");
});

////ROUTES
//API ROUTES
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
app.use('/articles',ArtilceRoutes);

app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
});

module.exports = app;