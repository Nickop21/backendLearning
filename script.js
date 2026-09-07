// const adding=require("./mathmodule")

// adding.add(2,5)
// adding.sub(12,1)


// file handling

const fs=require("fs")
// (file name to create,text) 
// fs.writeFileSync("./test.txt","hi i m the new file")
const result=fs.readFileSync("./test.txt","utf-8")
console.log(result);

//async
// (filename,utf,callback(err,res))
fs.readFile("./test.txt","utf-8",(err,res)=>{
    if (err) { console.log(err);}
    else{console.log(res);}
})

fs.appendFileSync("./test.txt",`\n${Date.now()} hii logged`)