var products    = require('../../models/product');
var cart        = require('../../models/cart');
var comment     = require('../../models/comment');
var user        = require('../../models/user');


module.exports  = {

    index : function (req, res) {

        products.getAllProducts(function (err, data) {
            if (err) {
                console.log(err);
                throw err;
            }

            res.render('index', { products: data });
        })
    },

    login: function (req, res) {
        res.render('login');
    },

    Signup: function(req, res) {
        res.render('signup');
    },

    addProductPage: function (req, res) {

        res.render('add');
    },

    cart : function (req, res) {
        // var id = req.params.id;
        var userId = req.session.usersId.id;
        cart.findUserProducts(userId, function (err, data) {
            if (err) {
                console.log(err);
                throw err;
            }

            res.render('cart', { products: data })
        })
    },

    productInfo: function (req, res) {
        var id = req.params.id;
        products.findUniqueProduct(id, function (err, data) {
            if (err) {
                console.log(err);
                throw err;
            }

            res.render('product_info', { singleProduct: data })
        })
    },

    addProductToCart: function(req, res) {
        var productId = req.params.id;
        var userId = req.session.usersId.id;

        cart.checkProductToCart(userId, productId, function (err, data) {
            if (err) {
                console.log(err);
                throw new err;
            }

            console.log(data)
            if (data.length != 0) {
                var count = data[0].count +1;
                cart.updateProduct(userId, productId,count, function(err, updated) {
                    if (err) {
                        console.log(err);
                        throw err;
                    }

                    console.log(updated);
                    res.redirect('/cart');
                })
            } else {
                cart.addProductToCart(userId, productId, 1, function(err, productAdded) {
                    if (err) {
                        console.log(err);
                        throw err;
                    }

                    console.log(productAdded);
                    res.redirect('/cart');
                })
            }

        })
    },

    info: function(req, res) {
        var productId = req.params.id;

        products.findUniqueProduct(productId, function(err, rows) {
            if (err) {
                console.log(err);
                throw new err;
            }

            comment.getComment(productId, function (err, productComments) {
                if (err) {
                    console.log(err);
                    throw err;
                }

                res.render('info', { product : rows[0], comments: productComments});
            })

        })
    },

    addComment: function(req, res) {
        var productId = req.params.id;
        var userId = req.session.usersId.id;


        res.render('add_comment', { productId, userId });
    },

    addUserComment: function(req, res) {
       var productId = req.params.productId;
       var userId = req.params.userId;
       var userComment = req.body.comment;

       comment.addUserComment(productId, userId,userComment, function(err, UserComment) {
           if (err) {
               console.log(err);
               throw err;
           }

           res.redirect('/products/' + productId);
       })

    },
    addUserToDb: function(req, res) {
        var name = req.body.name;
        var address = req.body.address;
        var email = req.body.email;
        var phone = +(req.body.phone);
        var password = req.body.password;

        user.addNewPerson(name, address, email, phone, password, function(err, user) {
            if (err) {
                console.log(err);
                throw err;
            }

            req.session.usersId =  {
                id: user.insertId,
                name: req.body.name,
                address: req.body.address,
                email: req.body.email,
                phone: +(req.body.phone),
                password: req.body.password
            };

            res.redirect('/');
        })
    },

    userEntered: function(req, res) {
        var name = req.body.name;
        var password = req.body.password;

        user.find(name, password, function(err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            var user = rows[0];

            req.session.usersId =  {
                id: user.id,
                name: user.name,
                address: user.address,
                email: user.email,
                phone: +(user.phone),
                password: user.password
            };

            res.redirect('/')
        })
    },
    logout: function(req, res) {
        req.session.usersId = "";

        res.redirect('/login');
    }
}