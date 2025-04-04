const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());

app.post('/register', (req,res) => {
  const {username,password} = req.body;
  res.json({requestDta:{username,password}})
});

app.listen(4000);
//mongodb+srv://atlas-sample-dataset-load-67efecdb4eb4ea2e33c8ea74:<db_password>@cluster0.ulwmvn2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//T5PJMKeukD3rLTH6