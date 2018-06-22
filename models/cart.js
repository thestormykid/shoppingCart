var db = require('../db.js');

module.exports = {

    findUserProducts: function(userId, callback) {
        var query = 'SELECT * FROM ?? as t1 INNER JOIN ?? as t2 on t1.productId = t2.id where userId = ? and count > 0';

        db.query(query,['cart', 'products', userId], function(err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }

            callback(null, rows);
        })
    },

    updateProduct: function(userId, productId, count,  callback) {
        var query = 'update ?? set count = ? where userId = ? and productId = ?';

        db.query(query, ['cart', count, userId, productId], function (err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }

            callback(null, rows);
        })
    },

    addProductToCart: function(userId, productId, count, callback) {
        var query = 'Insert into ?? (userId, productId, count) values (?,?,?)';
        db.query(query, ['cart', userId, productId, count], function (err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }

            callback(null, rows);
        })
    },

    update: function(productId, userId, text,count, callback) {
        var query = "update ?? set count = ? where productId = ? and userId = ?";

        if (text == 'increase') {
            count++;
            console.log()
            db.query(query,['cart', (count),productId, userId], function (err, rows) {
                if (err) {
                    console.log(err);
                    throw err;
                }

                console.log(rows);
                callback(null, rows);
            })
        } else  {
            count--;
            db.query(query,['cart',(count),productId, userId ], function (err, rows) {
                if (err) {
                    console.log(err);
                    throw err;
                }

                callback(null, rows);
            })
        }
    },
    checkProductToCart: function (userId, productId, callback) {
        var query = "select * from ?? where userId = ? and productId = ?";
        db.query(query, ['cart', userId, productId], function(err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }

            callback(null, rows);
        })
    }


}