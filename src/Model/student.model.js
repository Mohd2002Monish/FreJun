const { Schema, model } = require("mongoose");
const UserSchema = new Schema({
  email: { type: String, unique: true },
  name: String,
  roll_number: String,
  grade: String,
  subjects: {
    Mathematics: Number,
    Science: Number,
    English: Number,
  },
  total_marks: Number,
});
const UserModel = model("user", UserSchema);
module.exports = UserModel;
