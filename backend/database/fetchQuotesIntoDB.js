// just a fetch call that gets random 50 quotes from the api and gives out a json
export const fetchQuotes = async () => {
  try {
    const response = await fetch("https://zenquotes.io/api/quotes");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return [];
  }
};
