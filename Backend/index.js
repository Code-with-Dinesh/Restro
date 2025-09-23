import express from 'express'
import dotenv from 'dotenv'
import connectDb from './db/connection.js'
import userroute from './routes/user.routes.js'
import globalErrorHandler from './middleware.js/errorHandler.js'
const app = express()
dotenv.config()

app.use(express.json())
app.use(globalErrorHandler)
app.use("/api/v1",userroute)

app.listen(process.env.PORT,()=>{
    console.log("App listen on port number ",process.env.PORT)
})
connectDb()


