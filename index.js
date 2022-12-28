const express = require('express')
const app = express()
let date = new Date()
let localTime = date.toLocaleTimeString()
app.get('/',  (req, res) => {
  res.send('ok')
})
app.get('/test',(req,res)=>{
    res.status(200)
    res.send({message:`ok`})
})
app.get('/time', (req, res) =>{
    res.status(200)
    res.send({message:`${localTime}`})
});
app.listen(4000);