const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/noteApp");

const notesSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  isImportant: Boolean,
  uploadedBy: String,
  date:{
    type: Date,
    default: Date.now
  }
});

mongoose.model("Notes", notesSchema);

module.exports = mongoose.model("Notes")