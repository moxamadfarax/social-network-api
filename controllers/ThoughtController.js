// Importing the thought and user model.
const Thought = require("../models/thoughts");
const User = require("../models/users");

// Exporting all functions within the export parameter.
module.exports = {
  // Function to get all thoughts.
  getThoughts(req, res) {
    Thought.find()
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
  },

  // Function to get thought by ID.
  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({
              message:
                "No thought found with that ID. Please ensure you have the correct id and try again.",
            })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Function to  create a thought.
  newThought(req, res) {
    // Check that the required fields are present in the request body
    if (!req.body.thoughtText || !req.body.username || !req.body.userId) {
      return res.status(400).json({
        message: "Request body must include thoughtText, username, and userId",
      });
    }

    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          // Handle case where user was not found
          return res.status(404).json({
            message: "User not found with id " + req.body.userId,
          });
        }
        // Return success message
        res.json({ message: "Thought has been created" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  },

  // Function to update a thought.
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({
              message:
                "No thought found with that ID. Please ensure you have the correct id and try again.",
            })
          : res.json(thoughtData)
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // Function to delete a thought.
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({
              message:
                "No thought found with that ID. Please ensure you have the correct id and try again.",
            })
          : res.json({ message: "Thought successfully deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Function to create a new reaction.
  newReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({
              message:
                "No thought found with that ID. Please ensure you have the correct id and try again.",
            })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Function to delete a reaction.
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({
              message:
                "No thought found with that ID. Please ensure you have the correct id and try again.",
            })
          : res.json(`Reaction successfuly deleted.`)
      )
      .catch((err) => res.status(500).json(err));
  },
};
