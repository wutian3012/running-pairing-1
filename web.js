const express = require('express');
const fs = require('fs');
const session = require('express-session')
const bodyParser = require('body-parser') 

const auth = require("./auth");
const db = require("./db");

var app = express();
var port = process.env.PORT || 8080;

process.env.PWD = process.cwd()
app.use(express.static('./public'));
app.set("view engine", "ejs");
app.set("views", './views');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

auth.addRoutes(app);

app.get("/",function(req,res){
  res.render("index",{});
});
app.get("/userpage",function(req,res){
  if (req.session.email)
    res.render("userpage",{email:req.session.email});
  else
    res.redirect("/login");
});

app.listen(port);