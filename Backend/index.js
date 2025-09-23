import express from 'express'
import dotenv from 'dotenv'
import connectDb from './db/connection.js'
const app = express()
dotenv.config()

app.listen(process.env.PORT,()=>{
    console.log("App listen on port number ",process.env.PORT)
})
connectDb()


