const express = require('express');

const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message:"get request for orders"
    })
})
router.post('/', (req, res, next)=>{
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message:"postrequest for orders",
        order: order
    })
})
router.get('/:id', (req, res, next)=>{
    res.status(201).json({
        message:"get request for specific id",
        id: req.params.id
    })
})

module.exports = router;