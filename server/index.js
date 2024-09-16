import express from 'express'
import bodyParser from "body-parser"
import axios from 'axios'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
dotenv.config()


const app = express()

app.use(bodyParser.json()) // converts the encoded url to javascript object
app.use(express.static('public'))
app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type','Authorization'],
}))


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("mongoose connected")
})
.catch((error)=>{
    console.error('MongoDB connection error:', error);
})

app.use('/auth',authRoutes)
//app.use('alerts',priceAlertRoutes)



app.listen(process.env.PORT,()=>{
    console.log(`Server running successfully at ${process.env.PORT}`)
})
