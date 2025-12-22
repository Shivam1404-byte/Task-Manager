const express = require('express')
const cors = require('cors')
require('dotenv').config()
const authroutes = require('./Routes/authRoutes')
const taskroutes = require('./Routes/taskRoutes')

const app = express()

app.use(cors({
    origin:'http://localhost:5173',
    methods:["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"]
}))
    

app.use(express.json())

port = process.env.PORT || 5000

app.use('/api/auth',authroutes)
app.use('/api/tasks',taskroutes)


app.get('/',(req,res)=>{
    res.status(200).json("App is running")
})

app.listen(port,"0.0.0.0",()=>{
    console.log(`App is running on ${port}`)
})