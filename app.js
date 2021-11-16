const { request } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

const webToken = "dknfvdnfv121141"

function Token(req){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(webToken === token) return 1 
  else return 0
}

//use morgan for development, afterword you can delete it
app.use(
  express.json(), 
  morgan('dev')

)

app.get('/hello', (req, res) => {
  try{
    if(Token(req)){
      res.status(200).send({message: 'success'})
    }else{
      res.status(401).send({"status" : '401', error: 'unauthorization'})
    }
  }catch(err){
    res.status(500).send({error: 'server error'})
  }
})

app.post('/post', (req, res) => {
  try{
    if(Token(req)){
      res.status(200).send({message: req.body})
    }else{
      res.status(401).send({error: 'unauthorization'})
    }
  }catch(err){
    res.status(500).send({error: 'server error'})
  }
})

app.patch('/update', (req, res)=>{
  try{
    if(Token(req)){
      res.status(200).send({update: req.body})
    }else{
      res.status(401).send({error: 'unauthorization'})
    }
  }catch(err){
    res.status(500).send({error: 'server error'})
  }
})


app.delete('/delete', (req, res) => {
  try{
    if(Token(req)){
      res.status(200).send({message: req.body})
    }else{
      res.status(401).send({error: 'unauthorize'})
    }
  }catch(err){
    res.status(500).send({error: 'server error'})
  }
})


//to send json response when user type wrong URI
app.use(function (req, res){
  res.status(404); 
  if(req.accepts('json')){
    res.send({"status" : '404', error: 'Not Found'}); 
    return;
  }
})

app.listen(port, ()=>{
  console.log(`app running in http://127.0.0.1:${port}`)
})