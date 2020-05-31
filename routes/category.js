const router = require('express').Router();

router.get('/categoires', (req, res) => {
    res.send("OKE");
})

router.get('/category/:id', (req, res) => {
    res.send("category" + req.params.id);
})


module.exports = router;