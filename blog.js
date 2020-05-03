const express = require('express');
const bodyParser = require('body-Parser');
const path = require('path');
const app=express();
app.set('view engine','ejs');
app.set(path.join(__dirname,'../','views'));
app.use(bodyParser.urlencoded({extended:true}));

// config with mongodb

const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost/blog",{
useNewUrlParser: true,
useFindAndModify: false,
useCreateIndex: true,
useUnifiedTopology: true});
const blogSchema=new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{type:Date, default:Date.now}
});
let Blog=mongoose.model('blog',blogSchema);

/// RestFull Routes

Blog.create({
    title:"puppy",
    image:"https://unsplash.com/photos/T-0EW-SEbsE",
    body:"Trustworthy dog!!"
});
app.get('/',(req,res)=>{
     res.redirect('/blog');
});
app.get('/blog',(req,res)=>{
    Blog.find({},(err,blogs)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render('blog_index',{blogs:blogs});
        }
    });
    //res.render("blog_index");
});

app.listen(3000);