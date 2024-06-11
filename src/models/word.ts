import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WordSchema = new Schema({
  size: {
    type: Number,
  },
  title: {
    type: String,
    minLength: [3, "Words need to be at least 3 characters long"],
    maxLength: [10, "Words can't be over 10 characters long"],
    required: [true, "Word is required"],
  },
});

const Word = mongoose.model("Word", WordSchema);

export default Word;
