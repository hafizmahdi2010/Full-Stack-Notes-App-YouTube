const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/noteApp");

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  profilePic: String,
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('User', userSchema);

module.exports = mongoose.model('User');