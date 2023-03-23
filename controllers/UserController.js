// Importing user model.
const User = require("../models/users");

// Exporting all functions within the export parameter.
module.exports = {
  // Function to get all users.
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Function to get one user.
  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((userData) =>
        !userData
          ? res.status(404).json({
              message:
                "No user found with this id. Please ensure you entered the correct id.",
            })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Function to create new user.
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // Function to update a user.
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((userData) =>
        !userData
          ? res.status(404).json({
              message:
                "No user found with this id. Please ensure you entered the correct id.",
            })
          : res.json(userData)
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // Function to delete a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((userData) =>
        !userData
          ? res.status(404).json({
              message:
                "No user found with this id. Please ensure you entered the correct id.",
            })
          : res.json({ message: "User successfully deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Function to add friend.
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((userData) =>
        !userData
          ? res.status(404).json({
              message:
                "No user found with this id. Please ensure you entered the correct id.",
            })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Function to delete a friend.
  deleteFriend(req, res) {
    User.findOne({ _id: req.params.friendId })
      .then((userData) =>
        !userData
          ? res.status(404).json({
              message:
                "No friend found with this id. Please ensure you entered the correct id.",
            })
          : User.findOneAndUpdate(
              { _id: req.params.userId },
              { $pull: { friends: req.params.friendId } },
              { new: true }
            )
      )
      .then((userData) =>
        !userData
          ? res.status(404).json({
              message:
                "No user found with this id. Please ensure you entered the correct id.",
            })
          : res.json({ message: "Friend successfully removed!" })
      );
  },
};
