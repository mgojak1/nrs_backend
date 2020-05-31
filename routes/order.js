const router = require('express').Router();

router.get('/orders', (req, res) => {
    res.send("ORDER");
})

router.get('/order/:id', (req, res) => {
    res.send("Oreder " + req.params.id);
})


module.exports = router;