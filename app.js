var express 		= require('express'),
    app				= express(),
    bodyparser 		= require('body-parser'),
    methodOverride  = require('method-override'),
    routes 			= require('./routes/route');

var multer      = require("multer"),
    upload      = multer({ dest: 'views' });
var db          = require('./db');
var session     = require('express-session');
var MySQLStore  = require('express-mysql-session')(session);

var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '9630',
    database: 'shopdb'
};

var sessionStore = new MySQLStore(options);

app.use(session({
    key: 'something is not right',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended :true }));

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));


app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.post("/upload",upload.any(),function(req,res,next){
    var name = req.body.name;
    var image = req.files[0].path.replace("views/","");
    var description = req.body.description;
    var price = req.body.price;
    // var seller = "hanu";

    console.log(image);

    var query = "Insert into ?? (name, image, description, price) values (?,?,?,?)"

    db.query(query, ['products', name, image, description, price ], function(Err, rows) {
        if (Err) {
            console.log(Err);
            throw new Err;
        }

        res.redirect('/');
    });

});

app.use(function(req, res, next) {
    res.locals.currentUser = req.session.usersId;
    next();
});

app.use('/', routes);



app.listen('3000', function() {
    console.log("server is running......")
})