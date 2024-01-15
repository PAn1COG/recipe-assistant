const express = require("express");

const app =  express();
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(cors());
//use body-parser to middleware to parse incoming JSON data
app.use(bodyParser.json());

//Import the chatGPT endpoint module
const chatGPTRoutes = require("./routes/chatGPT");

// Use the chatGPT endpoint module to handle requests to "/chatGPT" endpoint

app.use("/chatGPT", chatGPTRoutes);

// app.post('/', (req,res)=>{
//     res.status(200).send({message:"Hello"});
// });

//Error Handling
app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
});

//Start the server at port 3000
app.listen(4000,()=>{
    console.log("Server started on port 4000");
});