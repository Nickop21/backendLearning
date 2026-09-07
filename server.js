const http=require("http")
const fs=require("fs")
const url=require("url")
const myserver=http.createServer((req,res)=>{
    console.log("server started");
    const log=`${Date.now()}:${req.url} New req Received\n`
    fs.appendFile("log.txt",log,(err,data)=>{
        switch(req.url){
            case "/":
                res.end("i m at homapage")
                break;
            case "/user":
                res.end("i m at user page")
                break;
            default:
                res.end("404 Error")        
        }

        // res.end("hello from my server")
    })
    
})
myserver.listen(8000,(err)=>{
    console.log("something wents erong" ,err);
    
})