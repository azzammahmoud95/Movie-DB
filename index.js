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
// Bonus 

app.get("/movies/get",(req,res)=>{
    res.send("Movie get")
})
app.get("/movies/edit",(req,res)=>{
    res.send("Movie edit")
})
app.get("/movies/delete",(req,res)=>{
    res.send("Movie delete")
})
// ADD A MOVIE
app.get('/movies/add',(req,res) => {
    if(req.query.title == "" || req.query.year == "" ||req.query.year == "undefined"||req.query.year.length != 4 ){
        res.status(403)
        res.send({status:403, error:true, message:'you cannot create a movie without providing a title and a year'})

    }else if( req.query.rating == ""){
        movies.push({title:req.query.title, year:req.query.year, rating:4})
        res.send({status:200, movies})
    }

    else {
    movies.push({title:req.query.title, year:req.query.year, rating:req.query.rating})
    res.send({status:200, movies})}

})
//Read Route
app.get("/movies/read",(req,res)=>{
    res.json({status:200,data:movies})
})

// READ BY ID
app.get('/movies/read/id/:ID',(req,res) =>{
    if(0 < req.params.ID && req.params.ID <= movies.length){
        res.send({status:200,data:movies[req.params.ID-1]})
    }else{
        res.status(404)
        res.send({status:404, error:true, message:`the movie ${req.params.ID} does not exist`})
    }
})
// Create Route
app.get("/movies/create",(req,res)=>{
    res.status(200)
    res.json({status:200,message:"Movie Created"})
})

// Update Route
app.get("/movies/update",(req,res)=>{
    res.send({status:200,message:"Movie updated"})
})
// Delete Route
app.get("/movies/delete",(req,res)=>{
    res.json({status:200,message:"Movie Deleted"})
})
app.listen(4000);