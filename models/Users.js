const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      // Regex validator that ensures string is an email.
      validate: {
        validator: function (email) {
          return /([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/.test(email);
        },
        message: (message) => `${message.value} is not a valid email address`,
      },
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("Users", userSchema);

module.exports = User;
