const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const mongoose  = require('mongoose');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }

})
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'images/jpeg' || file.mimetype === 'images/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage, 
    limits:{
    fileSize: 1024*1024*5
    }
})


router.get('/', (req, res, next) => {
    Product.find().
    select('name price _id productImage').
    exec().then(docs => {
        if(docs){
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        productImage:doc.productImage,
                        request: {
                            type: "GET",
                            url:"http://localhost:3000/products/" + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
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

router.post('/',upload.single('productImage') ,(req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
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