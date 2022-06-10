const mongoose = require("mongoose");

const fileShema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    sender: {
      type: String,
      required: false,
    },
    receiver: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model("File", fileShema);
module.exports = File 
