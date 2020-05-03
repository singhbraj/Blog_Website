const express = require('express');
const bodyParser = require('body-Parser');
const path = require('path');
const app=express();
app.set('view engine','ejs');
app.set(path.join(__dirname,'../','views'));
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.render('lan');
});
const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost/camp",{
useNewUrlParser: true,
useFindAndModify: false,
useCreateIndex: true,
useUnifiedTopology: true});
let campgroundSchema=new mongoose.Schema(
    {
        name:String,
        image:String,
        description:String
    });
let Campground=mongoose.model("campground",campgroundSchema);
// Campground.create({
//     name:"Delhi",
//     image:"https://photosforclass.com/download/pixabay-691424?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F50e9d4474856b108f5d084609620367d1c3ed9e04e5074417d2b79d2964ccd_1280.jpg&user=Free-Photos"
// },(err,campground)=>{
//     if(err)
//     {
//         console.log('Oh No! error');
//         console.log(err);
//     }
//     else{
//         console.log("Just added a new campground");
//         console.log(campground);
//     }
// })

// let campgrounds=[{name:"Kota",
//  image:"https://www.photosforclass.com/download/pixabay-4363073?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c7d277fd6954ac358_1280.png&user=bowl_of_nicole"},
//  {name:"Jaipur",
//  image:"https://www.photosforclass.com/download/pixabay-1845719?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d1464d53a514f6da8c7dda793f7f1636dfe2564c704c7d277fd6954ac358_1280.jpg&user=Pexels"}
// ];
app.get('/campground',(req,res)=>{
    Campground.find({},(err,newcamground)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render('index',{campgrounds:newcamground});
        }
    });
    //res.render('index',{campgrounds:campgrounds});
});
app.post('/campground',(req,res)=>{
    let name=req.body.name;
    let image=req.body.image;
    let desc=req.body.description;
    let newcampground={name:name, image:image,description:desc};
    Campground.create(newcampground,(err,campground)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.redirect('/campground');
        }
    })
   
});
app.get('/campground/new',(req,res)=>{
    res.render('new1');
});
// show routes
app.get('/campground/:id',(req,res)=>{
    Campground.findById(req.params.id,(err,found)=>{
        if(err)
        {
           console.log(err);
        }
        else
        {
            res.render("show",{campground:found});
        }
    })
});

app.listen(3000);