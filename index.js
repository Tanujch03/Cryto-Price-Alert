import express from 'express'
import bodyParser from "body-parser"
import axios from 'axios'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()


const app = express()

app.use(bodyParser.json()) // converts the encoded url to javascript object
app.use(express.static('public'))
app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type','Authorization'],
}))



