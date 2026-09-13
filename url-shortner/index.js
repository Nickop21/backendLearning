const express = require("express");
const app = express();
const router = express.Router();
const PORT = 8001;
const urlRoutes=require("./routes/url")
const URL=require("./models/url")

//connection
const {mongoDbConnection}=require("./connection")
mongoDbConnection("mongodb://localhost:27017/short-url").then((e)=>console.log("db connected")
)

app.get("/" , (req,res)=>{
    res.end("started");
    
});


app.get("/:shortId",async(req,res)=>{
    const shortId=req.params.shortId;
   const entry= await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            vistHistory:{
                timestamp:Date.now()
            }
        }
    })
        res.redirect(entry.redirectURl)
})

app.use(express.json())
app.use("/url",urlRoutes)

app.listen(PORT, () => console.log(`server started at port ${PORT}`));
