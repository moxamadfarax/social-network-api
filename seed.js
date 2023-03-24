const mongoose = require("mongoose");
const { Users, Thoughts } = require("./models");
const db = require("./config/connection");

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
  // Clear existing data
  await Users.deleteMany({});
  await Thoughts.deleteMany({});

  // Create users
  const user1 = new Users({ username: "user1", email: "user1@example.com" });
  const user2 = new Users({ username: "user2", email: "user2@example.com" });
  const user3 = new Users({ username: "user3", email: "user3@example.com" });
  const user4 = new Users({ username: "user4", email: "user4@example.com" });
  const user5 = new Users({ username: "user5", email: "user5@example.com" });

  // Create thoughts
  const thought1 = new Thoughts({
    thoughtText: "First thought",
    username: user1.username,
  });
  const thought2 = new Thoughts({
    thoughtText: "Second thought",
    username: user2.username,
  });
  const thought3 = new Thoughts({
    thoughtText: "Third thought",
    username: user3.username,
  });
  const thought4 = new Thoughts({
    thoughtText: "Fourth thought",
    username: user4.username,
  });
  const thought5 = new Thoughts({
    thoughtText: "Fifth thought",
    username: user5.username,
  });

  // Add reactions
  thought1.reactions.push({ reactionBody: "Like", username: user2.username });
  thought1.reactions.push({ reactionBody: "Love", username: user3.username });
  thought2.reactions.push({ reactionBody: "Like", username: user1.username });
  thought3.reactions.push({ reactionBody: "Love", username: user4.username });
  thought4.reactions.push({
    reactionBody: "Dislike",
    username: user2.username,
  });
  thought5.reactions.push({ reactionBody: "Lothe", username: user5.username });
  thought4.reactions.push({
    reactionBody: "Neutral",
    username: user5.username,
  });

  // Add thoughts to users
  user1.thoughts.push(thought1);
  user2.thoughts.push(thought3, thought5);
  user3.thoughts.push(thought2, thought4);
  user4.thoughts.push(thought4, thought2);
  user5.thoughts.push(thought1, thought3);

  // Add friends to users
  user1.friends.push(user2, user3);
  user2.friends.push(user1);
  user3.friends.push(user1, user2);

  // Save to database
  await user1.save();
  await user2.save();
  await user3.save();
  await user4.save();
  await user5.save();
  await thought1.save();
  await thought2.save();
  await thought3.save();
  await thought4.save();
  await thought5.save();

  mongoose.disconnect();
});
