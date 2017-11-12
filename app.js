const express=require('express');
const routes = require('./routes/api');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const config=require('./config')[process.env.NODE_ENV || 'development'];

//setup express app
const app=express();

//connnect to mongoose db
mongoose.connect('mongodb://'+
                config['database'].host+
                '/'+
                config['database'].db
            );


//mongoose promise has been deprecated
mongoose.Promise= global.Promise;

//static files middleware (html,css,js etc)
app.use(express.static('public'));

//setup bodyparser to parse incoming json data before it reaches our routes
app.use(bodyParser.json());

app.use('/api',routes);

//setup error handling function
app.use(function(err,req,res,next){
    console.log(err);
    res.status(422).send({'error':err.message});
});

//listen for requests. take port from env value or config file
app.listen(process.env.port || config['server'].port,function(){
    console.log('listening for requests');
});
