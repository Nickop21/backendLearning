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
next()    
});

app.get("/",(req, res) => {
    res.end("hii")
});

app.listen(PORT);
