const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const User =require('./models/User');
const Post = require("./models/Post");
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookiePaarser = require('cookie-parser');
const multer = require ("multer");
const uploadMiddleware = multer({dest: "uploads/"});
const fs = require("fs");
const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = 'asdfgjrjifjejygtiyrfe';

app.use(cors({credentials:true,origin:
 'http://localhost:3000',
  //"http://192.168.43.1:3000"
}));
app.use(express.json());
app.use(cookiePaarser());
app.use("/uploads", express.static(__dirname + "/uploads"));

//DATABASE CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/User');

// ATLAS CONNECTION
//mongoose.connect('mongodb+srv://spac:00134679@cluster0.wwjcvqa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.post('/register', async  (req,res) => {
  const {username,password} = req.body;
  try{
const userDoc = await
User.create({username,
password: bcrypt.hashSync(password, salt),
});
  res.json(userDoc);
  }catch(e){
    console.log(e)
    res.status(400).json(e)
  }
  console.log(`user document:${userDoc} User:${User}`)
});

app.post('/login', async  (req,res) => {
const {username,password} = req.body;
const userDoc = await User.findOne({username});
const passOk = bcrypt.compareSync(password,userDoc.password);
 if(passOk){
   jwt.sign({username,id:userDoc._id},secret,{},(error,token) =>{
     if(error) throw error;
     res.cookie('token', token).json({
       id:userDoc._id,
       username,
     });
   });
 }else{
   res.status(400).json('wrong credencials')
 }
 console.log(userDoc)
});

app.get('/profile',(req,res)=>{
const {token} = req.cookies;
jwt.verify(token, secret, {}, (error,info)=>{
  if(error)throw error;
  res.json(info);
 });
});


app.post('/logout',(req,res)=>{
  res.cookie('token','').json('ok')
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);
   
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async(error,info)=>{
  if(error)throw error;
     const {title,summary,content} = req.body;
   const postDoc = await Post.create({
     title,
     summary,
     content,
     cover:newPath,
     author:info.id,
   });
    res.json(postDoc);
    console.log(postDoc)
   });
    console.log(postDoc)
});

app.get("/post", async (req,res)=>{
  res.json(
    await Post.find()
    .populate("author",["username"])
    .sort({createdAt: -1})
    .limit(3)
  );
});
app.get("/post/:id", async (req,res)=>{
  const {id} = req.params;
  const postDoc = await Post.findById(id)
  .populate("author", ["username"]);
  res.json(postDoc)
})
// Ai code
/*
app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
  }
  const { token } = req.cookies;
  try {
    const info = jwt.verify(token, secret);
     console.log("&&&&&&&&&&&&&&&" + req.body)
    const { id, title, summary, content } = req.body;
     console.log("&&&&&&&&&&&&&&&" + id)
    const postDoc = await Post.findById(id);
    if (!postDoc) {
      return res.status(404).json("Post not found");
    }
    const isAuthor = postDoc.author.equals(info.id);
    if (!isAuthor) {
      return res.status(400).json("You are not the author");
    }
    postDoc.title = title;
    postDoc.summary = summary;
    postDoc.content = content;
    if (newPath) postDoc.cover = newPath;
    await postDoc.save();
    res.json(postDoc);
  } catch (error) {
    console.error(error);
    res.status(400).json("Invalid token or other error");
  }
});


/*/
app.put("/post", uploadMiddleware.single("file"), async (req, res)=>{
let newPath = null;
  if (req.file){
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  newPath = path + '.' + ext;
  fs.renameSync(path, newPath);
  }
  
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async(error,info)=>{
  if(error)throw error;
     const {id,title,summary,content} = req.body;
     const postDoc = await Post.findById(id);
     const isAuthor = JSON.Stringify(postDoc.author)=(info.id);
     
     if(!isAuthor){
       return res.status(400).json("you are not the author");
     }
  await postDoc.update({
     title,
     summary,
     content,
     cover:newPath ? newPath : postDoc.cover
   }); 
    res.json(postDoc);
   });
});
//req.json(post)

app.listen(4000, ()=> {
  console.log('Server listening on port 4000... ')
})