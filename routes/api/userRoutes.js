const router = require("express").Router();
// Requiring the functions from the user controller we created earlier.
const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// Home route that has a get and post property.
router
  .route("/")
  // The get property retrieves all user data.
  .get(getUsers)
  // The post property creates a new user.
  .post(createUser);

// Route with the "/:userId" endpoint that has a get, put and delete property.
router
  .route("/:userId")
  // The get property gets the user with that particular id
  .get(getOneUser)
  // The put property updates the user with that particular id.
  .put(updateUser)
  // The delete property deletes the user with that particular id.
  .delete(deleteUser);

// Route with the endpoint "/:userId/friends/:friendId" with a post and delete property.
router
  .route("/:userId/friends/:friendId")
  // The post property finds a user by their id and adds a friend to them using the friends particular id.
  .post(addFriend)
  // The delete property finds a user by their id and deletes a friend from them using the friends particular id
  .delete(deleteFriend);

module.exports = router;
