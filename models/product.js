var con = require('../db.js');

module.exports =  {

    getAllProducts : function (callback) {
        var query = "select * from ??"

        con.query(query,['products'], function(err, rows) {
            if (err) {
                throw err;
            }
            callback (null,rows);
        })
    },
    
    addProduct: function (name, image, description, manufacturer, price, callback) {
        var query = "Insert into ?? (name, image, description, manufacturer, price) values (?,?,?,?,?)"
        con.query(query,['products',name,image, description, manufacturer, price], function (err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            callback(null, rows);
        })
    },

    findUniqueProduct: function(id, callback) {
        var query = 'Select * from ?? where id = ?';
        con.query(query, ['products', id], function (err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }

            callback(null, rows);
        })
    }
}
