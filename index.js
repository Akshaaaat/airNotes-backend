const connectToMongo = require("./db");
const express = require('express');
var cors = require('cors')
connectToMongo();

const app = express()
const port = 5000

app.use(express.json());
app.use(cors())

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
  console.log(`air Notes backend listening http://localhost:${port}`)
})