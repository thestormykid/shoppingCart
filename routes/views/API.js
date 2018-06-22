var product = require('../../models/product');
var cart = require('../../models/cart');

module.exports = {

    addProduct: function(req, res) {
        var name = req.body.name;
        var image = req.body.image;
        var description = req.body.description;
        var manufacturer = req.body.manufacturer;
        var price = req.body.price;

        product.addProduct(name, image, description, manufacturer, price, function (err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }

            res.redirect('/');
        })
    },

    getPrice: function (req, res) {
        var userId = req.session.usersId.id;
        cart.findUserProducts(userId, function(err, data) {
            if (err) {
                console.log(err);
                throw err;
            }
            var totalAmount = 0;
            for (var x =0;x<data.length;x++) {
                totalAmount += (data[x].count)*(data[x].price);
            }
            console.log(totalAmount);
            res.json(totalAmount);
        })
    },

    updateCart: function (req, res) {

        var text = req.body.text;
        var productId = req.body.id;
        var userId = req.session.usersId.id;
        var count = req.body.count;
        console.log(productId, userId);

        cart.update(productId,userId, text,count, function (err, updated) {
            if (err) {
                console.log(err);
                throw err;
            }

            res.json('updated successfully');
        })
    }

}