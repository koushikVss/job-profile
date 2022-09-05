const express = require("express");
const logger = require ('morgan');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser')
const routes= require('./routes/profileroutes')
const app = express();
const cors = require("cors")

const DB_URI='mongodb+srv://profiledb:profile@profiledb.chkah5s.mongodb.net/?retryWrites=true&w=majority' ;
// const DB_URI='mongodb://localhost:27017/Profile' ;
// const DB_URI = process.env.MONGODB_SERVER;


app.use(cors())
app.use(
    cors({
        // origin: process.env.FRONT,//"http://localhost:3000",
        origin:"https://job-profileapi.herokuapp.com",
        // origin: ["http://localhost:3000","https://job-profileapi.herokuapp.com"],
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
)
mongoose.connect(DB_URI);
mongoose.connection.once('open',(err)=>{
    if(!err)
    {
        console.log('connection suscessful');
    }
});


app.use(bodyParser.json());

app.use('/api/v1', routes);



const port=process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`server running on port ${port}`)
})