const express = require('express')
const app = express()
let date = new Date()
let localTime  = date.toLocaleTimeString()

const movies = [ { title: 'Jaws', year: 1975, rating: 8 },
                 { title: 'Avatar', year: 2009, rating: 7.8 },
                 { title: 'Brazil', year: 1985, rating: 8 },
                 { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 } ]

app.get('/',  (req, res) => {
  res.send('ok')
})
// TEST
app.get('/test',(req,res)=>{
    res.status(200)
    res.send({message:`ok`})
})
// TIME
app.get('/time', (req, res) =>{
    res.status(200)
    res.json({message:`${localTime}`})
});
// HELLO ID
app.get(['/hello/:id','/hello'], (req, res) =>{
    if(req.params.id == undefined){
        res.send("hello")
    }else{
    res.status(200)
    res.json('hello ' + req.params.id);}

});
// SEARCH
app.get("/search",(req,res)=>{
    if(typeof req.query.s =="undefined" || req.query.s === "") 
    {res.json({status:500, error:true, message:"you have to provide a search"})
    }else {
        res.json( {status:200, message:"ok", data:req.query.s})
    }
})
// Create Route
app.get("/movies/create",(req,res)=>{
    res.status(200)
    res.json({status:200,message:"Movie Created"})
})
//Read Route
app.get("/movies/read",(req,res)=>{
    res.json({status:200,data:movies})
})
// Update Route
app.get("/movies/update",(req,res)=>{
    res.send({status:200,message:"Movie updated"})
})
// Delete Route
app.get("/movies/delete",(req,res)=>{
    res.json({status:200,message:"Movie Deleted"})
})

// Bonus 
app.get("/movies/add",(req,res)=>{
    res.send("Movie added")
})
app.get("/movies/get",(req,res)=>{
    res.send("Movie get")
})
app.get("/movies/edit",(req,res)=>{
    res.send("Movie edit")
})
app.get("/movies/delete",(req,res)=>{
    res.send("Movie delete")
})
// Bonus

// READ/BY
app.get("/movies/read/by-date",(req,res)=>{
    res.send({status:200, data:movies.sort((a,b)=>
        a.year - b.year)}
    )}
)
app.get("/movies/read/by-rating",(req,res)=>{
    res.send({status:200, data:movies.sort((a,b)=>
        b.rating - a.rating)}
    )}
)
app.get("/movies/read/by-title",(req,res)=>{
    res.send({status:200, data:movies.sort((a,b)=>
        (a.title).localeCompare(b.title))}
    )}
)

// READ BY ID
app.get('/movies/read/id/:ID',(req,res) =>{
    if(0 < req.params.ID && req.params.ID <= movies.length){
        res.send({status:200,data:movies[req.params.ID-1]})
    }else{
        res.status(404)
        res.send({status:404, error:true, message:`the movie ${req.params.ID} does not exist`})
    }
})

app.listen(4000);