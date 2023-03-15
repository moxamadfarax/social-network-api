const { connect, connection } = require("mongoose");

// Connecting to mongodb sERver using this particular db.
connect("mongodb://localhost:27017/social-network-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
