const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
var newItem="";
var newItems=[];
var workItems=[];
const app=express();

// Connect to database
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true});

// Create Schema
const itemsSchema={
	name:String
};

// Create mongoose Model
const Item=mongoose.model("Item",itemsSchema);

// Create New Mongoose Document
const item1=new Item({
	name:"Welcome to ToDo List"
});
const item2=new Item({
	name:'Hit the + button to add new item'
});
const item3=new Item({
	name:'<-- Hit this to delete an item'
});

const defaultItems=[item1,item2,item3];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public')); // Telling the server to load public folder as a static resource.
app.set('view engine','ejs');
app.get("/",function(req,res){

	Item.find({},function(err,foundItems){
	if(foundItems.length===0){
		// Insert these default items to our database.
		Item.insertMany(defaultItems,function(err){
		if(err)
			console.log('error is ' + err);
		else
			console.log('Successfully added default items to the database')
	});
		res.redirect('/');
	}
	else
		res.render('list',{listTitle:'Today',listItems:foundItems})
});
	
});	
app.post("/",function(req,res){
	// "/" is the root route or home route.
	let newItem=req.body.listItem;
	const item=new Item({
		name:newItem
	});
	item.save();
	res.redirect('/');
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
