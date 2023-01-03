const express=require('express')
const cookie=require('cookie-parser')
const router = require('./router/router')
require('dotenv').config()

const logger=require('./loggers')
const app=express()

app.use(express.json())
app.use(cookie())
const PORT=process.env.PORT||3000

app.use('/',router)


 

app.listen(PORT,()=>{
    console.log(`PORT NUMBER ${PORT} Listining!...`);
})   

