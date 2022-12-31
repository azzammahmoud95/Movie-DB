const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
mongoose.set('strictQuery', false);
app.use(bodyParser.json())
let date = new Date()
let localTime  = date.toLocaleTimeString()
const movies = [ { title: 'Jaws', year: 1975, rating: 8 },
                 { title: 'Avatar', year: 2009, rating: 7.8 },
                 { title: 'Brazil', year: 1985, rating: 8 },
                 { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 } ]
                 
// Connect to DATABASE
const uri = "mongodb+srv://azzammahmoud95:azzam.am12345@cluster0.iqwwaau.mongodb.net/movieDB?retryWrites=true&w=majority";
const Schema = mongoose.Schema;
const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    rating:{
        type: Number,
        default:4
    }

})

// module.exports = mongoose.model('Movie',movieSchema)


app.get("/movies/read", async (req, res) => {
    try {
      const movie = movies.find();
      res.json(movie);
    } catch (err) {
      console.log(err);
    }
  });
  app.post("/movies/add", async (req,res) => {
       try {
        movies.create({
           title: req.body.title,
           year: req.body.year,
           rating:req.body.rating

        })
    } catch (error) {
      response.status(500).send(error);
    }
  });
  app.put("/movies/update/:id", async (req, res) =>{
    try {
        const movie = await movies.updateOne(
          { _id: req.params.id },
          { $set: { title: req.body.title ,year:req.body.year,rating:req.body.rating} }
        );

        res.send(movie);
      } catch (err) {
        res.status(500).send(err);
      }
    });
    app.delete("/movies/delete/:id",(req,res)=>{
        movies.findByIdAndDelete(req.params.id).then(deletedMovie => {
            movies.find().then(movies => {
                res.send({ status: 200, data: movies });
            })
        }).catch(err => {
            res.status(404).send({ status: 404, error: true, message: `the movie '${req.params.id}' does not exist` });
        })
    })
//CONNECT TO DATABASE
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
// ADD A MOVIE
app.post('/movies/add',(req,res) => {
    if(req.query.title == "" || req.query.year == "" ||req.query.year == "undefined"||req.query.year.length != 4 || Number(req.query.rating) <=0 ||Number(req.query.rating) > 10  ){
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


// Delete Route
app.delete("/movies/delete/:ID",(req,res)=>{
    if(0 < req.params.ID && req.params.ID <= movies.length){
        movies.splice(req.params.ID-1,1)
        res.send({status:200,data:movies})
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
app.put("/movies/update/:ID",(req,res)=>{
     if (req.params.ID >0 && req.params.ID <= movies.length){
        if(req.query.title){
            movies[req.params.ID - 1].title = req.query.title
            res.json({status:200, data:movies})
        }
        else if(Number(req.query.rating) >0 && Number(req.query.rating) <= 10 ){
            movies[req.params.ID -1 ].rating = req.query.rating
            res.json({status:200, data:movies})
        }else if(req.query.year && req.query.year.length == 4 ){
            movies[req.params.ID-1].year = req.query.year
            res.json({status:200, data:movies})   
        }
     } else{
        res.send({status:404, error:true, message:`the movie ${req.params.ID} does not exist`})
     }
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

// READ/BY
app.get("/movies/read/by-date",(req,res)=>{
    res.json({status:200, data:movies.sort((a,b)=>
        a.year - b.year)}
    )}
)
app.get("/movies/read/by-rating",(req,res)=>{
    res.json({status:200, data:movies.sort((a,b)=>
        b.rating - a.rating)}
    )}
)
app.get("/movies/read/by-title",(req,res)=>{
    res.json({status:200, data:movies.sort((a,b)=>
        (a.title).localeCompare(b.title))}
    )}
)

app.listen(4000);