const http=require("http")
const fs=require("fs")
const url=require("url")
const myserver=http.createServer((req,res)=>{
    console.log("server started");
    const log=`${Date.now()}:${req.url} New req Received\n`
    const my_url=url.parse(req.url,true)
        console.log(my_url);
        
    fs.appendFile("log.txt",log,(err,data)=>{
        switch(my_url.pathname){
            case "/":
             if (req.method=="GET") res.end("i m at homapage")
                break;
            case "/user":
                const userid=my_url.query.userid
                const usename=my_url.query.name
                res.end(`i m at user page of ${usename} and id is ${userid} `)
                break;
            case "/signup":
                if (req.method=="GET") res.end("This is a signup form")
                 else if(req.method=="POST") res.end("Sucess")   
            default:
                res.end("404 Error")        
        }

        // res.end("hello from my server")
    })
    
})
myserver.listen(8000,(err)=>{
    console.log("something wents erong" ,err);
    
})