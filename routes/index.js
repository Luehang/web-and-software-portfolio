const express               = require('express');
const router                = express.Router();
const sgMail                = require('@sendgrid/mail');

const Product = require('../models/Product');

/* GET home page. */
router.get('/', (req, res) => {
    res.render('portfolio/main', {title: 'Lue Hang\'s Portfolio'});
});

router.post('/send-message', (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: process.env.SENDGRID_TO_EMAIL,
        from: req.body.email,
        subject: req.body.name,
        // text: '',
        html: req.body.message
    };
    sgMail.send(msg).then(() => {
        return res.send({
            success: true,
            message: "Message sent successfully."
        });
    }).catch(error => {
        if(error.code === 400) {
            return res.send({
                success: false,
                message: "Invalid E-mail. Please try again."
            });
        }
        return res.send({
            success: false,
            message: error.message
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
