const express = require("express");
const router = express.Router();

const {
  handleGetAllUsers,
  handleGetUserById,
  handleDeleteUserById,
  handleUpdateUserById,
  handleCreateNewUSer,
} = require("../controller/user");

// router.get("/users", async (req, res) => {
//   const allDbUsers = await User.find({});
//   const html = `<ul>
// ${allDbUsers.map((user) => `<li>${user.first_name} - ${user.email}</li>`)}
// </ul>`;
//   res.send(html);
// });

router.route("/").get(handleGetAllUsers).post(handleCreateNewUSer);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
