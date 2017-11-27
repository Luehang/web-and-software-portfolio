const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

/* GET home page. */
router.get('/', function(req, res, next) {
    const successMsg = req.flash('success')[0];
    Product.find(function(err, docs) {
        let productChunks = [];
        let chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('portfolio/index', { 
            title: 'Shopping Cart', 
            products: productChunks,
            successMsg: successMsg,
            noMessages: !successMsg
        });
    });
});

module.exports = router;

// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     req.session.oldUrl = req.url;
//     res.redirect('/user/signin');
// }
