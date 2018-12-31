const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET at products'
    })
} );
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    console.log(req.params.productId);
    if(id === 'special'){
        res.status(200).json({
            message:'The special id',
            id: id
        })
    } else {
        res.status(200).json({
            message:'the normal id'
        })
    }
})
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'POST at products'
    })
} )

module.exports = router; 