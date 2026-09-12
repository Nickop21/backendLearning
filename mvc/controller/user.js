const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
//   console.log(res)
  return res.json(allDbUsers);
}
async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return status(404).json({ error: "user not found with this id" });
  return res.json(user);
}

async function handleUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, {
    last_name: "yadav the great",
  });
  return res.json({ status: "Success" });
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "Success" });
}

async function handleCreateNewUSer(req, res) {
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
  return res.status(201).json({ msg: "success" });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleDeleteUserById,
  handleUpdateUserById,
  handleCreateNewUSer,
};
