const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const mongoose  = require('mongoose');

router.get('/', (req, res, next) => {
    Product.find().exec().then(docs => {
        if(docs){
            res.status(200).json(docs);
        } else {
            res.status(404).json({
                message:"No results"
            })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            err: err
        })
    })
});
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).exec().then(doc => {
        console.log(doc);
        if(doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: "No valid Entry for that Id"
            })
        }
        
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
})

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: 'POST at products',
            product :product
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });

})
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id:id}).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err        
        })
    });
})
router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.update({_id: id}, {$set:{name: req.body.name, price: req.body.price}}).exec().then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})
router.put("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).exec().then(product => {
        if(req.body.name){
            product.name = req.body.name;
        }
        if(req.body.price) {
            product.price = req.body.price;
        }
        return product.save();
    }).then(updatedProduct => {
        res.status(200).json(updatedProduct);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})
module.exports = router; 