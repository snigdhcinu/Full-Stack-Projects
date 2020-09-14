const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const port=process.env.PORT||8000;

let app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/studentsDB',{useNewUrlParser:true,useUnifiedTopology:true});

const studentSchema=new mongoose.Schema({
	username:String,
	password:String
})

const Student=mongoose.model('Student',studentSchema);


	// SIGN-IN page

app.get('/signin',function(req,res){
	res.sendFile(__dirname+'/signin.html')
})

app.post('/signin',function(req,res){
	let username=req.body.email;
	let pwd=req.body.password;
	Student.find({username:username},function(err,fruits){
		if(err){
			console.log(err)
		}
		else{
			// console.log(fruits[0].password);
			if(fruits[0].password==pwd){
				res.redirect('/homepage')
			}
			else{
				res.send('password is incorrect')
			}
		}
	})
})

	// SIGN-UP page

app.get('/signup',function(req,res){
	res.sendFile(__dirname+'/signup.html')
})


app.post('/signup',function(req,res){
	let username=req.body.email;
	let pwd1=req.body.password1;
	let pwd2=req.body.password2;
	if(pwd1==pwd2){
		let newUser=new Student({
		username:username,
		password:pwd1
		});
		newUser.save();

		res.sendFile(__dirname+'/signin.html')
	}
	else{
		res.send('Password do not match, please try again!!');
	}
})

	// HOMEPAGE

app.get('/homepage',function(req,res){
	res.send('This is the homepage');
})


app.listen(port,function(){
	console.log(`server is online on port ${port}...`)
})