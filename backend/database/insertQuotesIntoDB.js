import { fetchQuotes } from "./fetchQuotesIntoDB.js";
import quoteModel from "../models/quoteModel.js";

export const insertQuotes = async () => {
  const quotes = await fetchQuotes();

  // Check if there are any quotes in the database
  const count = await quoteModel.countDocuments();

  if (count === 0) {
    // If there are no quotes, insert 50 new quotes
    await insertNewQuotes(quotes);
  } else {
    // If there are quotes, delete the oldest 50 quotes before inserting new ones
    await deleteOldestQuotes(count);
    await insertNewQuotes(quotes);
  }

  console.log("Quotes fetched and inserted into the database.");
};

const insertNewQuotes = async (quotes) => {
  if (!Array.isArray(quotes)) {
    console.error("Expected an array of quotes, but received:", quotes);
    return;
  }

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
  // Find the oldest 50 quotes
  const oldestQuotes = await quoteModel.find({}).sort({ _id: 1 }).limit(50);

  // Extract the _id of the oldest 50 quotes
  const idsToDelete = oldestQuotes.map((quote) => quote._id);

  // Delete the oldest 50 quotes by their _id
  await quoteModel.deleteMany({ _id: { $in: idsToDelete } });
};
