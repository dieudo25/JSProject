// Select the new quote button
const newQuoteButton = document.querySelector("#new_quote");
// Select the twitter button
const tweeterButton = document.querySelector("#tweet_quote");
// Select the spinner element
const spinner = document.querySelector("#spinner");
// EndPoint of "What Does Donald Trump Think" API that get randoms quote
const endpoint = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";

// event click on new quote button
newQuoteButton.addEventListener(
  "click",
  () => {
    let quote = getQuote();
  },
  false
);

//asynchrone fonction (promise) that get a Quote from the API
async function getQuote() {
  //Remove the 'hidden' class from the spinner it is now visible
  spinner.classList.remove("hidden");
  // Disable the quote button
  newQuoteButton.disabled = true;

  try {
    // fetch the random quote with the endpoint
    const response = await fetch(endpoint);

    // Throw an error ff the promise (fetch) is rejected (!response.ok)
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();
    displayQuote(json.message);
    setTweetButton(json.message);
  } catch (err) {
    console.log(err);
    alert("Failed to fetch new quote!");
  } finally {
    // Add the 'hidden' class to the spinner, it is now not visible
    spinner.classList.add("hidden");
    // Able the use of the quote button
    newQuoteButton.disabled = false;
  }
}

// Function that display the quote fetched form the API
function displayQuote(quote) {
  const quoteText = document.querySelector("#quote_text p");
  // Change the contetnt of the element selected
  quoteText.textContent = quote;
}

// Function that share the quote to twitter
function setTweetButton(quote) {
  tweeterButton.setAttribute(
    "href",
    `https://twitter.com/share?text=${quote} - Donald Trump`
  );
}

getQuote();
