const express = require('express');
const app = express();
const morgan = require('morgan');

// To parse incoming post requests url encoded or json... 
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//To console log requests that are made.
app.use(morgan('dev'));

//Parsing incoming requests of both forms
app.use(bodyParser.urlencoded({extended:false }));
app.use(bodyParser.json());

//Handing CORS Error
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
})

//Routes Handling
app.use('/products', productRoutes);
app.use('/orders', orderRoutes );

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