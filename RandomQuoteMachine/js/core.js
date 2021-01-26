// Select the new quote button
const newQuoteButton = document.querySelector("#new_quote");

// event click on new quote button
newQuoteButton.addEventListener(
  "click",
  (e) => {
    let quote = getQuote();
  },
  false
);

// EndPoint of "What Does Donald Trump Think" API that get randoms quote
const endpoint = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";

//asynchrone fonction (promise) that get a Quote from the API
async function getQuote() {
  try {
    // fetch the random quote with the endpoint
    const response = await fetch(endpoint);

    // Throw an error ff the promise (fetch) is rejected (!response.ok)
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();
    displayQuote(json.message);
    return json;
  } catch (err) {
    console.log(err);
    alert("Failed to fetch new quote!");
  }
}

function displayQuote(quote) {
  const quoteText = document.querySelector("#quote_text p");
  quoteText.textContent = quote;
}
