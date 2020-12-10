const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine','ejs')
app.use(express.static('public'));




mongoose.connect('mongodb://localhost:27017/profileDB', {useNewUrlParser:true,useUnifiedTopology:true})



// Profile model & schema

const profileSchema = new mongoose.Schema({
	dp:{ data: Buffer, contentType: String },
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
		console.log(req.file)
	})


app.listen('8000',()=>{
	console.log('Server online on port 8000')
})