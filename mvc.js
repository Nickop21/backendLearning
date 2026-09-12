const express=require("express")
const app=express()
const PORT=8000

const userRouter=require("./mvc/routes/user")
const  {logReqRes}=require("./mvc/middleware/userMiddlerware")


//connection

const {connectMongoDb}=require("./mvc/connection")
connectMongoDb("mongodb://127.0.0.1:27017/nitin-db")

app.use(express.urlencoded({extended:false}))

app.use(logReqRes("log.txt"))
app.get("/",(req,res)=>{
    return res.end("hey i m homepage")
})
app.use("/users" ,userRouter)



app.listen(PORT,()=>console.log(`Server Starte at PORT:${PORT}`)
)