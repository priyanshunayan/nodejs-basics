const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
// To parse incoming post requests url encoded or json... 
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');
// Connecting to the Databases
mongoose.connect('mongodb+srv://node-shop:' + process.env.MONGO_ATLAS_PS +'@cluster0-cwplo.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});
mongoose.Promise = global.Promise;
//To console log requests that are made.
app.use(morgan('dev'));

//Parsing incoming requests of both forms(url encoded and json)
app.use(bodyParser.urlencoded({extended:false }));
app.use(bodyParser.json());

app.use(express.static('uploads'))
//Handing CORS Error
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});

    }
    next();
})

//Routes Handling
app.use('/products', productRoutes);
app.use('/orders', orderRoutes );
app.use('/user', userRoutes);
//Handling Errors

//routes which don't match the above routes will pass through this and give error.
app.use((req, res, next) => {
    const error  = new Error('Not Found');
    error.status = 404;
    next(error);
})
//Errors like Database query failed will pass through this.
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
})

module.exports = app;