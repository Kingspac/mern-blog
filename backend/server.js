const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const User =require('./models/User');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = 'asdfgjrjifjejfe'

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
mongoose.connect('mongodb+srv://spac:00134679@cluster0.wwjcvqa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

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
});

app.post('/login', async  (req,res) => {
const {username,password} = req.body;
const userDoc = await User.findOne({username});
const passOk = bcrypt.compareSync(password,userDoc.password);
 if(passOk){
   jwt.sign({username,id:userDoc._id},secret,{},(error,token) =>{
     if(error) throw error
     res.cookie('token', token).json('ok')
   })
 }else{
   res.status(400).json('wrong credencials')
 }
});
app.listen(4000);

