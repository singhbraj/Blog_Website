const express = require('express');
const bodyParser = require('body-Parser');
const path = require('path');
const app=express();
const methodOverride=require('method-override');
app.set('view engine','ejs');
app.set(path.join(__dirname,'../','views'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

// app.use(express.static(__dirname + '/Public'));

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

// Blog.create({
//     title:"Rusty",
//     image:"https://photosforclass.com/download/pixabay-1846142?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c7d2772d09e4ac05c_1280.jpg&user=Pexels",
//     body:"Sanskari dog!!"
// });
app.get('/',(req,res)=>{
     res.redirect('/blog');
});
 
   // Index Route   

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
 
 // New Route
 
app.get('/blog/new',(req,res)=>{
    res.render('blog_new');
});

// Create Route

app.post('/blog',(req,res)=>{
    // let title=req.body.title;
    // let image=req.body.title;
    // let body=req.body.title;
    // let newBlog={title:title, image:image, body:body};
    Blog.create(req.body.blog,(err,newBlog)=>{
        if(err)
        {
            res.render(blog_new);
        }
        else
        {
            res.redirect('/blog');
        }

    });
});
  
//   Show Route

app.get('/blog/:id',(req,res)=>{
       Blog.findById(req.params.id,(err,referBlog)=>{
           if(err)
           {
               res.redirect('/blog');
           }
           else
           {
            res.render('blog_show',{blog:referBlog});
           }
   
      });
});

// EDIT Route

app.get('/blog/:id/edit',(req,res)=>{

    Blog.findById(req.params.id,(err,referBlog)=>{
        if(err)
        {
            res.redirect('/blog');
        }
        else
        {
         res.render('blog_edit',{blog:referBlog});
        }
    });
});

//    Update Route

app.put("/blog/:id",(req,res)=>{
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err,updatedBlog)=>{
        if(err)
        {
            res.redirect('/blog');
        }
        else
        {
            //res.send("Hello i am update!!");
         res.redirect('/blog/' + req.params.id);
        }
});
});


//  Delete Route

app.delete('/blog/:id',(req,res)=>{
// res.send('You have reached the destroy route!!'); 
Blog.findByIdAndRemove(req.params.id, (err)=>{
    if(err)
    {
        res.redirect('/blog');
    }
    else
    {
        res.redirect('/blog');
    }
})
});

app.listen(3000);
