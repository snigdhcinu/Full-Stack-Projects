const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine','ejs')
app.use(express.static('public'));




mongoose.connect('mongodb://localhost:27017/profileDB', {useNewUrlParser:true,useUnifiedTopology:true})



// Profile model & schema

const profileSchema = new mongoose.Schema({
	dp:{ data: String, contentType: String },
	name:String,
	occ:String,
	add:String,
	phno:Number,
	gender:String,
	pref:String
});

const Profile = mongoose.model('Profile',profileSchema)


										// Home Route

app.route('/')
	.get((req,res)=>{
		res.redirect('/form');
	})

										// Form Route

app.route('/form')
	.get((req,res)=>{
		res.render('form');
	})

	.post( upload.single('dp'),(req,res)=>{
		let name = req.body.name;
		let add = req.body.add;
		let phno = req.body.phno;
		let occ = req.body.occ;
		let gender = req.body.gender;
		let pref = req.body.pref;

		let user = new Profile({

			dp:{ data: `upload/${req.file.filename}`, contentType: req.file.mimetype },
			name:name,
			occ:occ,
			add:add,
			phno:phno,
			gender:gender,
			pref:pref
		})

		console.log(user);
		user.save();
		res.redirect('/profile')
	})

app.route('/profile')
	.get((req,res)=>{
		Profile.find((err,docs)=>{
			if(err){
				res.send(err);
			}	
			else{
				res.render('profile',{result:docs})
			}
		})
		
	})


app.listen('8000',()=>{
	console.log('Server online on port 8000')
})