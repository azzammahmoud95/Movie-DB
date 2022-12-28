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
app.get(['/hello/:id','/hello'], (req, res) =>{
    if(req.params.id == undefined){
        res.send("hello")
    }else{
    res.status(200)
    res.send('hello ' + req.params.id);}

});
app.get("/search",(req,res)=>{
    if(typeof req.query.s =="undefined" || req.query.s === "") 
    {res.send({status:500, error:true, message:"you have to provide a search"})
    }else {
        res.send( {status:200, message:"ok", data:req.query.s})
    }
})
app.listen(4000);