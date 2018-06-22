const mysql = require('mysql2')


const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '9630',
    database: 'shopdb'
})

con.connect(function(err) {
    if (err) {
        console.log(err);
        throw err;
    }

    console.log('connected');
})

module.exports = con;