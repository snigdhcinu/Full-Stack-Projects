const express=require('express');
const bodyParser=require('body-parser');
const date=require(__dirname+'/date.js');
var newItem="";
var newItems=[];
var workItems=[];
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public')); // Telling the server to load public folder as a static resource.
app.set('view engine','ejs');
app.get("/",function(req,res){
	let day=date.getDate();
	res.render('list',{listTitle:day,listItems:newItems})
});	
app.post("/",function(req,res){
	// "/" is the root route or home route.
	let newItem=req.body.listItem;
	if(req.body.list==='work'){
		workItems.push(newItem);
		res.redirect('/work');
	}else{
		newItems.push(newItem);
		res.redirect('/');
	}
});
app.get('/work',function(req,res){
	res.render('list',{listTitle:'Work',listItems:workItems})
});
app.post('/work',function(req,res){
	let newItem=req.body.listItem;
	workItems.push(newItem);
	res.redirect('/work')
});
app.get('/aboutus',function(req,res){
	res.render('aboutus.ejs')
})
app.listen(3000,function(){
	console.log("Server online at port 3000.....")
});
