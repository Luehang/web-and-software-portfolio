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
    const { name, email, message } = req.body;
    const msg = {
        to: process.env.SENDGRID_TO_EMAIL,
        from: email,
        subject: "PORTFOLIO SITE: Requesting Message",
        // text: '',
        html: `<table style="background:#fafafa;width:100%;">
                    <tbody>
                <tr style="padding:0; vertical-align:top; text-align:center;">
                <td class="x_center" align="center" valign="top" style="word-break:break-word; padding:0; vertical-align:top; text-align:center; color:#333333; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-weight:normal; margin:0; line-height:20px; font-size:14px; border-collapse:collapse!important">
                <center style="width:100%; min-width:580px">
                <table class="x_row x_header" style="border-spacing:0; border-collapse:collapse; padding:0px; vertical-align:top; text-align:center; width:100%;">
                <tbody>
                <tr style="padding:0; vertical-align:top; text-align:center">
                <td class="x_center" align="center" style="word-break:break-word; padding:0; vertical-align:top; text-align:center; color:#333333; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-weight:normal; margin:0; line-height:20px; font-size:14px; border-collapse:collapse!important">
                <center style="width:100%; min-width:580px">
                <table class="x_container" style="border-spacing:0; border-collapse:collapse; padding:0; vertical-align:top; text-align:inherit; width:580px; margin:0 auto">
                <tbody>
                <tr style="padding:0; vertical-align:top; text-align:center">
                <td class="x_wrapper x_last" style="word-break:break-word; padding:0; vertical-align:top; text-align:center; color:#333333; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-weight:normal; margin:0; line-height:20px; font-size:14px; padding-right:0px; border-collapse:collapse!important">
                <table class="x_twelve x_columns" style="border-spacing:0; border-collapse:collapse; padding:0; vertical-align:top; text-align:center; margin:0 auto; width:580px">
                <tbody>
                <tr style="padding:0; vertical-align:top; text-align:center">
                <td style="word-break:break-word; padding:0px 0px 10px; vertical-align:top; text-align:center; color:#333333; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-weight:normal; margin:0; line-height:20px; font-size:14px; border-collapse:collapse!important">
                <div class="x_mark" style="text-align:center; padding:25px 0 17px;"><a href="${process.env.APP_URL}" target="_blank" style="text-align:center; color:#4183C4; text-decoration:none"><div style="display: inline-block; max-width: 99.9%;"><img src="${process.env.APP_URL}/favicon.ico" alt="${process.env.APP_NAME}, Inc." width="102" height="28" class="x_center x_logo-wordmark" style="outline:none; text-decoration:none; width:auto; max-width:100%; border:none; margin:0 auto; float:none; text-align:center"></div>   ${process.env.APP_NAME}</a></div>
                </td>
                <td class="x_expander" style="word-break:break-word; padding:0!important; vertical-align:top; text-align:center; color:#333333; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-weight:normal; margin:0; line-height:20px; font-size:14px; visibility:hidden; width:0px; border-collapse:collapse!important">
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </center>
                </td>
                </tr>
                </tbody>
                </table>
                <table class="x_container" style="border-spacing:0; border-collapse:collapse; padding:0; vertical-align:top; text-align:inherit; width:580px; margin:0 auto">
                <tbody>
                <tr style="padding:0; vertical-align:top; text-align:center; border:1px solid #dddddd; border-radius:3px; background:#fff;">
                <td style="word-break:break-word; padding:10px; vertical-align:top; text-align:center; color:#333333; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-weight:normal; margin:0; line-height:20px; font-size:14px; border-collapse:collapse!important">
                <table class="x_row" style="border-spacing:0; border-collapse:collapse; padding:0px; vertical-align:top; text-align:center; width:100%; display:block">
                <tbody>
                <tr style="padding:0; vertical-align:top; text-align:center">
                <td class="x_wrapper x_last" style="word-break:break-word; padding:0; vertical-align:top; text-align:center; color:#333333; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-weight:normal; margin:0; line-height:20px; font-size:14px; padding-right:0px; border-collapse:collapse!important">
                <table class="x_twelve x_columns" style="border-spacing:0; border-collapse:collapse; padding:0; vertical-align:top; text-align:center; margin:0 auto; width:580px">
                <tbody>
                <tr style="padding:0; vertical-align:top; text-align:center">
                <td class="x_no-padding" style="word-break:break-word; padding:0; vertical-align:top; text-align:center; color:#333333; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-weight:normal; margin:0; line-height:20px; font-size:14px; border-collapse:collapse!important">
                <div class="x_hero-image-wrap" style="overflow:hidden; border-radius:3px 3px 0 0">
                <a href="${process.env.APP_URL}" target="_blank" style="color:#4183C4; text-decoration:none"><div style="display: inline-block; max-width: 99.9%;"><img src="${process.env.APP_URL}/img/web-logo.png" alt="${process.env.APP_NAME}" border="0" class="x_hero-image" style="margin:0; padding:0; outline:none; text-decoration:none; height:200px; max-width:100%; border:none; display:block"></div> </a></div>
                </td>
                <td class="x_expander" style="word-break:break-word; padding:0!important; vertical-align:top; text-align:center; color:#333333; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-weight:normal; margin:0; line-height:20px; font-size:14px; visibility:hidden; width:0px; border-collapse:collapse!important">
                </td>
                </tr>
                </tbody>
                </table>
                <div class="x_panel" style="background:#ffffff; background-color:#ffffff;padding:0 20px 20px;width:538px">
                <table class="x_twelve x_columns x_panel-contents" style="border-spacing:0; border-collapse:collapse; padding:0; vertical-align:top; text-align:center; margin:0 auto; width:540px">
                <tbody>
                <tr style="padding:0; vertical-align:top; text-align:center">
                <td style="word-break:break-word; padding:0px 0px 10px; vertical-align:top; text-align:center; color:#333333; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-weight:normal; margin:0; line-height:20px; font-size:14px; border-collapse:collapse!important">
                <div class="x_content">
                <h2 class="x_content-heading" style="color:#333; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-weight:300; padding:0; margin:25px 0 20px; text-align:center; line-height:1; word-break:normal; font-size:22px">
                ${name} is requesting a message.</h2>
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Message: ${message}</p>
                <div class="x_cta-button-wrap" style="padding:30px 0 20px; text-align:center; color:#ffffff">
                <a href="${process.env.APP_URL}" target="_blank" style="color:#ffffff; text-decoration:none; display:inline-block; text-align:center; background:#23b5f7; background-color:#23b5f7; border-radius:5px; -webkit-border-radius:5px; padding:12px 44px; font-weight:bold; letter-spacing:normal; font-size:17px; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; margin:0 auto; width:auto!important">Go to Site</a></div>
                </div>
                </td>
                <td class="x_expander" style="word-break:break-word; padding:0!important; vertical-align:top; text-align:center; color:#333333; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-weight:normal; margin:0; line-height:20px; font-size:14px; visibility:hidden; width:0px; border-collapse:collapse!important">
                </td>
                </tr>
                </tbody>
                </table>
                </div>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                <table class="x_row x_layout-footer" style="border-spacing:0; border-collapse:collapse; padding:0px; vertical-align:top; text-align:center; width:100%">
                <tbody>
                <tr style="padding:0; vertical-align:top; text-align:center">
                <td class="x_center" align="center" style="word-break:break-word; padding:0; vertical-align:top; text-align:center; color:#333333; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-weight:normal; margin:0; line-height:20px; font-size:14px; border-collapse:collapse!important">
                <center style="width:100%; min-width:580px">
                <table class="x_container" style="border-spacing:0; border-collapse:collapse; padding:0; vertical-align:top; text-align:inherit; width:580px; margin:0 auto">
                <tbody>
                <tr style="padding:0; vertical-align:top; text-align:center">
                <td class="x_wrapper x_last" style="word-break:break-word; padding:0; vertical-align:top; text-align:center; color:#333333; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-weight:normal; margin:0; line-height:20px; font-size:14px; padding-right:0px; border-collapse:collapse!important">
                <table class="x_twelve x_columns" style="border-spacing:0; border-collapse:collapse; padding:0; vertical-align:top; text-align:center; margin:0 auto; width:580px">
                <tbody>
                <tr style="padding:0; vertical-align:top; text-align:center">
                <td style="word-break:break-word; padding:0px 0px 10px; vertical-align:top; text-align:center; color:#333333; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-weight:normal; margin:0; line-height:20px; font-size:14px; border-collapse:collapse!important">
                <div class="x_footer-links" style="padding:20px 0; text-align:center">
                <p class="x_footer-text" style="margin:0; word-wrap:normal; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:12px; font-weight:normal; color:#999; line-height:20px; padding:0; text-align:center">
                <a href="#" target="_blank" style="color:#2d99bb; text-decoration:none">Unsubscribe</a></p>
                <p class="x_footer-text" style="margin:0; word-wrap:normal; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:12px; font-weight:normal; color:#999; line-height:20px; padding:0; text-align:center">
                <a href="#" target="_blank" style="color:#2d99bb; text-decoration:none">Terms</a> • <a href="#" target="_blank" style="color:#2d99bb; text-decoration:none">Privacy</a></p>
                </div>
                <div class="x_content" style="margin:0 0 15px 0"><a href="#" target="_blank" style="color:#4183C4; text-decoration:none"><div style="display: inline-block; max-width: 99.9%;"><img src="https://ih1.redbubble.net/image.197984217.2529/ap,550x550,12x12,1,transparent,t.u2.png" class="x_logo-invertocat" width="40" height="38" style="outline:none; text-decoration:none; width:auto; max-width:100%; border:none"></div> </a></div>
                <div class="x_content" style="margin:0 0 15px 0">
                <p class="x_footer-text" style="margin:0; word-wrap:normal; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:12px; font-weight:normal; color:#999; line-height:20px; padding:0; text-align:center">
                ${process.env.APP_NAME}, Inc.</p>
                <p class="x_footer-text" style="margin:0; word-wrap:normal; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:12px; font-weight:normal; color:#999; line-height:20px; padding:0; text-align:center">
                ${process.env.APP_URL}<span tabindex="0" role="button" class="contextualExtensionHighlight ms-font-color-themePrimary ms-border-color-themePrimary ident_5621_5651"></span><br><span tabindex="0" role="button" class="contextualExtensionHighlight ms-font-color-themePrimary ms-border-color-themePrimary ident_5621_5651">
                United States</span></p>
                </div>
                </td>
                <td class="x_expander" style="word-break:break-word; padding:0!important; vertical-align:top; text-align:center; color:#333333; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-weight:normal; margin:0; line-height:20px; font-size:14px; visibility:hidden; width:0px; border-collapse:collapse!important">
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </center>
                </td>
                </tr>
                </tbody>
                </table>
                </center>
                </td>
                </tr>
                </tbody>
                </table>`
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
