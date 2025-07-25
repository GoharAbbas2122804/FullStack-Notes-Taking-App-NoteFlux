// const express = require('express'),when we have set the type to commonjs when "type" : "models"
import express from 'express'          
import dotenv from "dotenv"
import cors from 'cors'
import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;


//when we try to fetch data from another website , the api backend might block
//the request , is that cross origins resource sharing , our front end is asking 
//the backend api to share the data but the api is blocking due to cross origin sharing 
//to enable this we use a package cors , and use it as a middle ware
app.use(cors({
    origin : "http://localhost:5173"   //we are allowing only our front end to use our api request
    
}))


//this middleware will parse the JSON body , req.body to get all the values we are sending as an req from client
app.use(express.json());


//middleware is a function that runs between the clinet request and server response
// app.use((req, res , next) => {
//     console.log(`Request method is ${req.method} and url is ${req.url}`)
//     next()
// })


//this middlware is for applying rate Liminting so that user can only request the server 10 times in 10 second 
app.use(rateLimiter)


app.use('/api/notes' , notesRoutes);

//first connect to mongoDB then start the server , logic is that 
//if we have connected to database then we have to start the server other wise no needed 
connectDB().then(()=>{
    app.listen(PORT , ()=>{
        console.log(`Server is Running on PORT ${PORT}`);
        
    })
});




