import mongoose from "mongoose";

// schema for all the data the zenquotes api provides
const quoteSchema = new mongoose.Schema(
  {
    q: {
      type: String,
      required: true,
    },
    a: {
      type: String,
      required: true,
    },
    c: {
      type: String,
      required: true,
    },
    h: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const quoteModel = mongoose.model("Quote", quoteSchema);

export default quoteModel;
