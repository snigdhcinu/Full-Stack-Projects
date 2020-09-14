const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost:27017/studentsDB',{useNewUrlParser:true,useUnifiedTopology:true});

const studentSchema=new mongoose.Schema({
	username:String,
	password:String
})

const Student=mongoose.model('Student',studentSchema);

app.get('/',function(req,res){
	Student.find(function(err,foundStudents){
		res.send(foundStudents);
	})
})

app.listen(8888,function(){
	console.log('The GET API is online on port 8888...');
})