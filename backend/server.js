const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const user =require('./models/user');
const app = express();


app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://kingsleybulus3:MxNRbpTDVrmuraDg@cluster0.m8fqrra.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.post('/register', async  (req,res) => {
  const {username,password,email} = req.body;
  const userDoc = await user.create({username,password,email});
  res.json(userDoc);
});

app.listen(4000);

