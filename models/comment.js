var con = require('../db.js');

module.exports =  {

    addUserComment: function (productId, userId,comment, callback) {
        var query = "Insert into ?? (productId, userId, comment) values (?,?,?)"

        con.query(query,['comments', productId, userId, comment], function (err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }

            callback(null, rows);
        })
    },

    getComment: function(productId, callback) {
        var query = 'Select * from ?? where productId = ?'

        con.query(query, ['comments', productId], function(err, comments) {
            if (err) {
                console.log(err);
                throw err;
            }

            callback(null, comments);
        })
    }


}