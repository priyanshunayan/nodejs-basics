const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Order = require('../models/orders');
const Product = require('../models/products');
router.get('/', (req, res, next)=>{
    Order.find().
    populate('productId')
    .exec().then(docs => {
        res.status(200).json({
            length: docs.length,
            orders: docs.map(doc => {
               return{
                productId: doc.productId,
                quantity : doc.quantity,
                _id: doc.id,
                request: {
                    type:"GET",
                    url:"http://localhost:3000/" + doc.id
                }
               } 
            }),
            
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})
router.post('/', (req, res, next)=>{
    Product.findById(req.body.productId).then(product => {
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            productId: req.body.productId,
            quantity: req.body.quantity
        })
        return order.save()
    }).then(order =>{
        res.status(201).json({
            message:"Order created successfully",
            order: order
        })
     }).catch(err =>{ 
         res.json(500).json({
             error:err
         })
     })


})
router.get('/:id', (req, res, next)=>{
    res.status(201).json({
        message:"get request for specific id",
        id: req.params.id
    })
})

module.exports = router;