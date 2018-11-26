const app = require('./app');
var path = require('path');


const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log("Magic happens on Port "+port);
});

