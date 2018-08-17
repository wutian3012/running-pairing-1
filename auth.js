const db = require("./db");
const bcrypt = require('bcrypt');
const saltRounds = 10;



exports.addRoutes = function(app){
  app.get("/login",function(req,res){
    res.render("login",{"authMessage":null});
  });
  app.get("/register",function(req,res){
    res.render("register",{"authMessage":null});
  });
  app.post("/register",function(req,res){
	var conpswd = req.body["confirm-password"];
    var pswd = req.body.password;
    var email = req.body.email;
    if (pswd != conpswd)
	  return res.render("register",{"authMessage":"Password don't match."});
    // eventually implement email verification
    db.findUser(email,function(user){
      if (user)
        return res.render("register",{"authMessage":"User already exists with that email."});
      bcrypt.hash(pswd, saltRounds, function(err, hash) {
        var user = {
          "email":email,
          "password":hash,
          "times":{},
          "VO2":-1
        }
        db.newUser(user,function(){
          res.redirect("login");
        })
      });
    });
    
  });
  app.post("/login",function(req,res){
    var pswd = req.body.password;
    var email = req.body.email;
    db.findUser(email,function(user){
      if (!user)
        return res.render("login",{"authMessage":"User not found."});
      bcrypt.compare(pswd, user.password, function(err, valid) {
        if (valid == true){
          req.session.email = email;
		  console.log(req.session.email);
		  res.redirect("userpage");
        }else{
          res.render("login",{"authMessage":"Incorrect password."});
        }
      });
    });
    
  });
}