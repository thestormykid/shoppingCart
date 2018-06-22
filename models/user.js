var con = require('../db.js');

module.exports = {

    addNewPerson: function (name, address, email, phone, password, callback) {
        console.log(name, address, email, phone, password);

        var query = "Insert into ?? (name,address,email,phone,password) values (?,?,?,?,?)"
        console.log(query);
        con.query(query,["users", name, address, email, phone, password], function (err, rows) {
            console.log(query);
            if (err) {
                console.log(err);
                throw err;
            }
            console.log(rows);

            callback(null, rows);
        })
    },

    find: function(name, password,callback) {
        var query = "select * from ?? where name = ? and password = ?"

        con.query(query, ['users', name, password], function (err, rows) {
            if (err) {
                console.log(err);
            }

            callback(err, rows);
        });
    }
}
