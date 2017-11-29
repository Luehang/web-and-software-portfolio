const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

/* GET home page. */
router.get('/', (req, res) => {
    res.render('portfolio/main', {title: 'Lue Hang\'s Portfolio'});
});

router.get('/index', (req, res) => {
    res.render('portfolio/index', {title: 'Lue Hang\'s Portfolio'});
});

module.exports = router;

// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     req.session.oldUrl = req.url;
//     res.redirect('/user/signin');
// }
