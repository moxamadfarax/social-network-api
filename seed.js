const mongoose = require("mongoose");
const { Users, Thoughts } = require("./models");
const db = require("./config/connection");

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
  // clear existing data
  await Users.deleteMany({});
  await Thoughts.deleteMany({});

  // create users
  const user1 = new Users({ username: "user1", email: "user1@example.com" });
  const user2 = new Users({ username: "user2", email: "user2@example.com" });
  const user3 = new Users({ username: "user3", email: "user3@example.com" });

  // create thoughts
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

  // add reactions
  thought1.reactions.push({ reactionBody: "Like", username: user2.username });
  thought1.reactions.push({ reactionBody: "Love", username: user3.username });
  thought2.reactions.push({ reactionBody: "Like", username: user1.username });
  thought3.reactions.push({ reactionBody: "Love", username: user2.username });

  // add thoughts to users
  user1.thoughts.push(thought1);
  user2.thoughts.push(thought2, thought1);
  user3.thoughts.push(thought3, thought1);

  // add friends to users
  user1.friends.push(user2, user3);
  user2.friends.push(user1);
  user3.friends.push(user1, user2);

  // save to database
  await user1.save();
  await user2.save();
  await user3.save();
  await thought1.save();
  await thought2.save();
  await thought3.save();

  mongoose.disconnect();
});
