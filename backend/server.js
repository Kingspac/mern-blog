const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const User =require('./models/User');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookiePaarser = require('cookie-parser');
const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = 'asdfgjrjifjejygtiyrfe';

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookiePaarser());


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
     res.cookie('token', token).json('ok');
   })
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
 })
})

/*
app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json('No token provided');
  }
  jwt.verify(token, secret,{},(error, info) => {
    if (error) throw error;
    res.json(info);
  });
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  console.log(token)
  jwt.verify(token, secret, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(401).json('Invalid token');
    }
    console.log('Token verified:', info);
    res.json(info);
  });
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, (error, info) => {
    if (error) {
      console.log(error); // Log the error
      return res.status(401).json('Invalid token');
    }
    res.json(info);
  });
});


app.get('/profile', (req, res) => {
  console.log('cookies',req.cookies); // Log all cookies
  const { token } = req.cookies;
  console.log('token',token); // Log the token specifically
  // ...
});

*/

app.post('/logout',(req,res)=>{
  res.cookie('token','').json('ok')
})
app.listen(4000, ()=> {
  console.log('Server listening on port 4000... ' );
});

