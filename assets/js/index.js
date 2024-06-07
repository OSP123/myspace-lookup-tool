const timestamp = dayjs("11-04-2012").unix(); // gives us a timestamp format that the url expects
const formEl = document.querySelector(".search-form");
const searchInputEl = document.getElementById("search-input");
const displayEl = document.querySelector(".custom-display-links");

// This is great for returning a url based on a known username and timestamp. However, we need to determine what time stamps exist for the user. Is there some capability for the API to return that?

https://web.archive.org/cdx/search/cdx?url=myspace.com/akiraasylum&output=json

// const url = `https://archive.org/wayback/available?url=http://www.myspace.com/akiraasylum&timestamp=${timestamp}`;

// https://web.archive.org/cdx/search/cdx?url=myspace.com/akiraasylum&output=json

// Endpoint format: https://web.archive.org/web/20121104011556/http://www.myspace.com/akiraasylum



formEl.addEventListener("submit", function(event) {
  event.preventDefault();
  // assuming we have the username, let's make a request to the api
  const searchKeyword = searchInputEl.value;
  console.log(searchKeyword);

  const url = `https://cors-anywhere.herokuapp.com/https://web.archive.org/cdx/search/cdx?url=myspace.com/${searchKeyword}&output=json`;

  console.log(url);

  fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    const successUrls = data.filter(urlArr => {
      return urlArr[4] === "200";
    })
    console.log(successUrls);
    successUrls.forEach(urlArr => {
      let url = `https://web.archive.org/web/${urlArr[1]}/${urlArr[2]}`;

      const anchorEl = document.createElement("a");
      anchorEl.href = url;
      anchorEl.textContent = url;
      anchorEl.setAttribute("target", "_blank");

      const listItem = document.createElement("li");
      listItem.appendChild(anchorEl);
      displayEl.children[0].appendChild(listItem);
    });
    // Now we have our URLs filtered to only come back with data that has a success status code. Next step is to display the urls to the page in the format of https://web.archive.org/web/20121104011556/http://www.myspace.com/akiraasylum
  });
})