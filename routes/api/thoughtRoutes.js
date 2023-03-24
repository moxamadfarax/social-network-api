const router = require("express").Router();
// Requiring the functions from the thoughts controller we created earlier.
const {
  getThoughts,
  getOneThought,
  newThought,
  updateThought,
  deleteThought,
  newReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// Home route that has a get and post property.
router
  .route("/")
  // The get property retrieves all thought data.
  .get(getThoughts)
  // The post property creates a new thought.
  .post(newThought);

// Route with the "/:thoughtId" endpoint that has a get, put and delete property.
router
  .route("/:thoughtId")
  // The get property retrieves a thought by it's id.
  .get(getOneThought)
  // The put property updates a thought by it's id.
  .put(updateThought)
  // The delete property deletes a thought by it's id.
  .delete(deleteThought);

// Route with the "/:thoughtId/reactions" endpoint has a get property.
router
  .route("/:thoughtId/reactions")
  // The post property adds a reaction to a thought by it's id.
  .post(newReaction);

// Route with the "/:thoughtId/reactions/:reactionId" endpoint has a delete property.
router
  .route("/:thoughtId/reactions/:reactionId")
  // The delete property deletes a reaction from a thought by it's id.
  .delete(deleteReaction);

module.exports = router;
