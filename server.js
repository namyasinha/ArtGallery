var express=require("express")
var mysql=require("mysql")
var bcrypt=require("bcrypt")
var db=require("./routes/database")
var bodyParser=require("body-parser")
var session=require("express-session")
var app=express();
var ejs=require("ejs");
var fileUpload=require("express-fileupload");
var path=require("path");
//var auth=require("./middleware/auth")

var login=require("./routes/login")
var cookieParser = require('cookie-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser({
	cookie: {
		httpOnly: true,
		secure: true
	  }
}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.set('view engine','ejs');

app.use(express.static('public'))
app.use(fileUpload())




//register 
var register=require("./routes/register")
app.route('/register').post(register)

//login

app.route('/login').post(login)
app.get("/login",(req,res)=>{
	res.sendFile(__dirname+"/login.html")
})

//homepage
app.get("/",(req,res)=>{
	res.sendFile(__dirname+"/dash.html")
})

//artists
app.get("/artists",(req,res)=>{
	res.sendFile(__dirname+"/artists.html")
})
//home
app.get("/home",(req,res)=>{
	res.render('home')
})



//logout
app.get("/logout",(req,res)=>{
	//res.clearCookie('user')
	
	res.redirect("/")
})

app.listen(3000)
console.log("App listening on port 3000")

