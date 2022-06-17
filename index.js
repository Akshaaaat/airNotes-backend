const connectToMongo = require("./db");
const express = require('express');
connectToMongo();

const app = express()
const port = 5000

app.use(express.json());

//available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req,res)=>{
  res.send("hiii");
})

app.get('/hii', (req,res)=>{
  res.send("hiiiiiii");
})

app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`)
})