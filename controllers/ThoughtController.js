// Importing the thought and user model.
const Thought = require("../models/thoughts");
const User = require("../models/users");

// Exporting all functions within the export parameter.
module.exports = {
  // Get all Thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
  },

  // Get Thought by ID
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

  // Create a thought
  newThought(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((userData) =>
        !userData
          ? res.status(404).json({
              message:
                "No user found with that ID. Please ensure you have the correct id and try again.",
            })
          : res.json("Thought has been created")
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // Update a thought
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

  // Delete a thought
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

  // Full route path is /api/thoughts/:thoughtId/reactions
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

  // Full route path is /api/thoughts/:thoughtId/reactions/:reactionId
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
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
};
