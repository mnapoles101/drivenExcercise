const mongoose = require("mongoose");
const { Schema } = mongoose;

const checkerSchema = new Schema({
  input: { type: Number, required: true },
});

const Checker = mongoose.model("Number", checkerSchema);

module.exports = Checker;
