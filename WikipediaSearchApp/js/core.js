// Get the form element
const form = document.querySelector(".js-search-form");
// Get a reference to the `.js-search-results` element
const searchResults = document.querySelector(".js-search-results");
// Get the spinner element
const spinner = document.querySelector(".js-spinner");

// Listen to the event when the form is submited
form.addEventListener("submit", handleSubmit, false);

//  Function that will handle the submission of the form
async function handleSubmit(event) {
  // prevent page from reloading when form is submitted
  event.preventDefault();
  // Get the value of the input
  const inputValue = document.querySelector(".js-search-input").value;
  // Remove the whitespace and tabs from the input
  const searchQuery = inputValue.trim();
  // Clear the previous results
  searchResults.innerHTML = "";
  // Remove hidden class from spinner element
  spinner.classList.remove("hidden");
  try {
    // Get the results from the API
    const results = await searchWikipedia(searchQuery);
    // If there is no results
    if (results.query.searchinfo.totalhits === 0) {
      alert("No results found. Try different keywords");
      return;
    }
    // Display the results of the search by the aid of the function
    displayResults(results);
  } catch (err) {
    console.log(err);
    alert("Failed to search Wikipedia!");
  } finally {
    // Add hidden class to spinner element
    spinner.classList.add("hidden");
  }
}

/* // Buid an Endpoint for Wikipedia EndPoint
function buildWikiEndPoint(searchQuery) {
  // Base URL for the API
  let url = "https://en.wikipedia.org/w/api.php";
  // Create an object with the parameters needed for the use of the API
  let params = {
    list: "search",
    prop: "info",
    inprop: "url",
    utf8: "",
    format: "json",
    origin: "*",
    srlimit: 20,
    srsearch: searchQuery,
  };

  url = url + "?action=query";
  // add each parametters of the object to the URL endPoint
  Object.keys(params).forEach(function (key) {
    url += "&" + key + "=" + params[key];
  });
  console.log(url);
} */

async function searchWikipedia(searchQuery) {
  const endPoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
  /*   // Create an endpoint for the API
  const endPoint = buildWikiEndPoint(searchQuery); */

  // Fetch the API
  const response = await fetch(endPoint);
  // If the fetch failed throw an error
  if (!response.ok) {
    throw Error(response.statusText);
  }
  // If the fetch is succeful format the response in json
  const json = response.json();
  return json;
}

function displayResults(results) {
  // Iterate over the `search` array. Each nested object in the array can be
  // accessed through the `result` parameter
  results.query.search.forEach((result) => {
    const url = `https://en.wikipedia.org/?curid=${result.pageid}`;

    // Append the search result to the DOM
    searchResults.insertAdjacentHTML(
      "beforeend",
      `<div class="result-item">
          <h3 class="result-title">
            <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
          </h3>
          <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
          <span class="result-snippet">${result.snippet}</span><br>
        </div>`
    );
  });
}
