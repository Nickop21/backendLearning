const express = require("express");
const app = express();
const fs = require("fs");
const mongoose = require("mongoose");
const users = require("./MOCK_DATA.json");
const { type } = require("os");
const PORT = 8000;

//connect mongoose

mongoose
  .connect("mongodb://127.0.0.1:27017/nitin-db")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));
//schema
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  ip_address: {
    type: String,
  },
});
//interact with mongoose

const User = mongoose.model("user", userSchema);

//middleware
app.use((req, res, next) => {
  console.log("middleware");
  next();
});

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `<ul>
${allDbUsers.map((user) => `<li>${user.first_name} - ${user.email}</li>`)}
</ul>`;
  res.send(html);
});

app.get("api/users" , async(req,res)=>{
    const allDbUsers=await User.find({})
    return res.json(allDbUsers)

})
app.get("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user)
      return status(404).json({ error: "user not found with this id" });
    return res.json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
      last_name: "yadav the great",
    });
    return res.json({ status: "Success" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
  });

  app.post("/api/users", async (req, res) => {
    const body = req.body;
    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender ||
      !body.ip_address
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const result = await User.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      gender: body.gender,
      ip_address: body.ip_address,
    });
    return res.status(201).json({msg:"success"})
  });
  

app.listen(PORT);
