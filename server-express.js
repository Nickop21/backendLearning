const express = require("express");
const fs = require("fs");
const app = express();
const users = require("./MOCK_DATA.json");

app.use(express.urlencoded({ extended: false }));
app.get("/",(req,res)=>{
    res.end("hi i m from express server")
})

app.get("/users", (req, res) => {
    const html=`<ul>
    ${users.map((user)=>{
        return `<li>${user.first_name}</li> `
    }).join("")}
    </ul>`
  res.send(html);
});
// app.get("/api/users/:id",(req,res)=>{
//     const id=Number(req.params.id)
//     const user=users.find(users=>users.id==id)
//     if (!user) res.end("no user found with this id") 
//     return res.json(user)
// })

app.route("/api/users/:id").get((req,res)=>{
    const id=Number(req.params.id)
    const user=users.find(users=>users.id==id)
    if (!user) res.end("no user found with this id") 
    return res.json(user)
}).patch((req,res)=>{
    //edit user with id
    return res.json({status:"Pending"})
}).delete((req,res)=>{
    //delete user with id
    return res.json({status:"Pending"})
})


app.get("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "sucess", id: users.length });
  });
});
app.listen(8000, () => {
  console.log("express server started");
});
