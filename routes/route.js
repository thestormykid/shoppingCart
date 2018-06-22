var express = require('express');
var router = express.Router();

var routes = {
    views: {
       index: require("./views/index"),
       api: require('./views/API')
    }
}


router.get('/', isLoggedIn, routes.views.index.index);
router.get('/add',isLoggedIn, routes.views.index.addProductPage);
router.get('/cart',isLoggedIn, routes.views.index.cart);
router.get('/cart/:id', isLoggedIn, routes.views.index.addProductToCart);
router.get('/login', routes.views.index.login);
router.get('/Signup', routes.views.index.Signup);
router.post('/Signup', routes.views.index.addUserToDb);
router.post('/login', routes.views.index.userEntered);
router.get('/logout', routes.views.index.logout);


// router.get('/products/:id', routes.views.index.productInfo);
router.get('/products/:id',isLoggedIn, routes.views.index.info);
router.get('/products/:id/addComments',isLoggedIn, routes.views.index.addComment);

router.post('/products/:productId/:userId/comments', routes.views.index.addUserComment);


router.get('/getPrice', routes.views.api.getPrice);
router.post('/addProduct', routes.views.api.addProduct);
router.post('/updateCart', routes.views.api.updateCart);



function isLoggedIn (req, res, next) {

    console.log()
    if (req.session.usersId) {
        next();
    } else {
        res.redirect('/login')
    }
    // next();
}


module.exports = router;