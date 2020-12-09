const multer = require('multer')
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine','ejs')
app.use(express.static('public'));
// mongoose.connect('mongodb://localhost:27017/bbankDB',
// 	{useNewUrlParser:true,useUnifiedTopology:true})
let password = process.env.PASSWORD;


mongoose.connect('mongodb://localhost:27017/profileDB',
	{useNewUrlParser:true,useUnifiedTopology:true})
// mongoose.connect(`mongodb+srv://root:${password}@cluster0.bxeya.mongodb.net/bbankDB?retryWrites=true&w=majority`,
// 	{useNewUrlParser:true,useUnifiedTopology:true})


// Hospital model & schema

const profileSchema = new mongoose.Schema({
	name:String,
	// id will serve as password, since unique to every hospital
	id:String,
	address:String,
	city:String,
	state:String,
	phno:Number,
	avail:{
		Apos:Number,
		Aneg:Number,
		Bpos:Number,
		Bneg:Number,
		Opos:Number,
		Oneg:Number,
		ABpos:Number,
		ABneg:Number
	}
})

const Profile = mongoose.model('Profile',profileSchema)