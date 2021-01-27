const form = document.querySelector(".js-search-form");

form.addEventListener("submit", handleSubmit, false);

async function handleSubmit(event) {
  // prevent page from reloading when form is submitted
  event.preventDefault();
  // Get the value of the input
  const inputValue = document.querySelector(".js-search-input").value;
  // Remove the whitespace and tabs from the input
  const searchQuery = inputValue.trim();

  try {
    // Get the results from the API
    const results = await searchWikipedia(searchQuery);
    console.log(results);
  } catch (err) {
    console.log(err);
    alert("Failed to search Wikipedia!");
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
