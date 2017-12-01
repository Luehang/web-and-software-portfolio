const express               = require('express');
const router                = express.Router();
const csrf                  = require('csurf');

const csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function(req, res, next) {
    Order.find({user: req.user}, null, { $sort: -1 }, function(err, orders) {
        if (err) {
            return res.write('Error.');
        }
        orders = orders.reverse();
        let cart;
        orders.forEach(function(order) {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('user/profile', { orders: orders });
    });
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}