import { fetchQuotes } from "./fetchQuotesIntoDB.js";
import quoteModel from "../models/quoteModel.js";

export const insertQuotes = async () => {
  const quotes = await fetchQuotes();

  // checks if there are any quotes in the database
  const count = await quoteModel.countDocuments();

  if (count === 0) {
    // if there are no quotes, inserts 50 new quotes
    await insertNewQuotes(quotes);
  } else {
    // if there are quotes, delete the oldest 50 quotes before inserting new ones
    // so as to not just adding quotes to db and ballooning its size
    await deleteOldestQuotes(count);
    await insertNewQuotes(quotes);
  }

  console.log("Quotes fetched and inserted into the database.");
};

const insertNewQuotes = async (quotes) => {
  // checks if the res is a array of quotes
  if (!Array.isArray(quotes)) {
    console.error("Expected an array of quotes, but received:", quotes);
    return;
  }

  // if it is then adds it to db
  quotes.forEach(async (quote) => {
    const newQuote = new quoteModel({
      q: quote.q,
      a: quote.a,
      c: quote.c,
      h: quote.h,
    });

    await newQuote.save();
  });
};

const deleteOldestQuotes = async () => {
  // finds the oldest 50 quotes
  const oldestQuotes = await quoteModel.find({}).sort({ _id: 1 }).limit(50);

  // extracts the _id of the oldest 50 quotes
  const idsToDelete = oldestQuotes.map((quote) => quote._id);

  // deletes the oldest 50 quotes by their _id
  await quoteModel.deleteMany({ _id: { $in: idsToDelete } });
};
