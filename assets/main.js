// variables to target specific classes/IDs
var drinkBox = document.querySelector("#drinkContainer");
var showDrinks = document.querySelector("#getDrinks");
var mainDiv = document.querySelector("#main-content")
var jokesDiv = document.querySelector("#jokes")
var searchBar = document.querySelector("#searchBar");
var header = document.querySelector("#header")
//Joke paragraph//
var jokePEl = document.querySelector("#jokeP");





// utility/functionality variables 
// empty array to house random numbers used to select cocktails from the API
var randomNumbers = [];
// variable to store the user's ingredient in global scope
var ingredientName = "";
// establishing drinkResults in the global scope
var drinkResults;
// variable for the timer for the joke screen transition
var timeLeft = 10;
// variable to append text into the jokes div
var jokesTextDiv = document.createElement("div");

// function to ensure that the search bar isn't empty
function searchCheck() {
  ingredientName = document.getElementById("searchBar").value;
  if (ingredientName === "") {
    searchBar.setAttribute("placeholder", "You can't search for no ingredient!");
  } else {
    getDrinks();
  }
}

// function that fetches a drink list based on the user's seached ingredient
function getDrinks() {
  var requestUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredientName;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function(data) {
      // renderDrinks(data)
      drinkResults = data;
    });

    jokesTransition();
  // addToStorage();
}

// event that triggers the search for the ingredient and also begins the transition between screens
showDrinks.addEventListener("click", searchCheck);

function renderDrinks() {
  for (var i = 0; i < drinkResults.drinks.length; i++) {
    // create
    var drinkName = document.createElement("p");
    // modify
    drinkName.textContent = drinkResults.drinks[i].strDrink //What is the sttrDrink?
    document.body.append(drinkName)
  }
}

// function that generates up to five numbers used to select drinks for display based on the user's search
function getRandomNumbers() {
  // clears the array in case for some reason it had old data in it
  randomNumbers = [];
  // determining how many numbers to generate based on the length of drinkData, then adding those numbers to randomNumbers
  if (drinkResults.drinks.length < 5) {
    for (i=0; i < drinkResults.drinks.length; i++) {
      var random = Math.floor(Math.random() * drinkResults.drinks.length);
      randomNumbers.push(random);
    }
  } 
  else {
    for (i=0; i < 5; i++) {
      var random = Math.floor(Math.random() * drinkResults.drinks.length);
      randomNumbers.push(random);
      }
    }
  }

// function to transition content from the search screen

function jokesTransition() {
    getJokes();
      // test text
  console.log ("hello there!");
  // class switches to hide pre-search screen and start the timer
  mainDiv.setAttribute("class", "hide-me");
  jokesDiv.setAttribute("class", "jokes-div");
  jokesDiv.appendChild(jokesTextDiv);
  jokesTextDiv.textContent = "Loading your results in.. " + timeLeft + " seconds";
  var jokesTimer = setInterval(function () {
    if (timeLeft > 1) {
      jokesTextDiv.textContent = "Loading your results in.. " + timeLeft + " seconds";
      timeLeft--;
    } else if (timeLeft === 1) {
      jokesTextDiv.textContent = "Loading your results in.. " + timeLeft + " second";
      timeLeft--;
    } else {
      jokesTextDiv.textContent = "Your search results are.."
      resultsTransition();
      clearInterval(jokesTimer);
      setTimeout(afterTimeout , 3000);
      
    }
  }, 1000);

}


function afterTimeout(){
  mainDiv.setAttribute("class", "hide-me");
 jokesDiv.setAttribute("class", "hide-me");
 renderDrinks()
}


// function to transition from the jokes screen to the final content
function resultsTransition() {
  // test text
  console.log("Hello there! The results transition calls properly!")
}

var requestUrl = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log("List of ingredients");
    console.log(data);
  });

  
//Function for the Jokes API
 function getJokes() {
  var requestJokesUrl = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&contains=Bar&amount=1";

  //Fetch the API
  fetch(requestJokesUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
  //Render the Jokes
      //  renderJokes(data);
    console.log(data.joke);
        // create elements on HTML
       var jokeName = document.createElement("p");
        // modify
        jokeName.textContent = data.joke; 
      jokePEl.appendChild(jokeName); 
      
    });

 }

/* Uncomment this if it's determined to be necessary. 
// Set and empty searched ingredients Array to global
var searchedIngredientsArray = [];
// This function adds the keyword in the search bar to the local storage as a string
function addToStorage() {
  var searchedIngredient = document.querySelector("#searchBar").value;
  searchedIngredientsArray.push(searchedIngredient);
  localStorage.setItem(
    "searchedDrinks",
    JSON.stringify(searchedIngredientsArray)
  );
  renderStorage();
}
// This function renders ingredient search history on the page
function renderStorage() {
  var searchedIngredientsArray = JSON.parse(localStorage.getItem("searchedDrinks")) || [];
    localStorage.getItem("searchedDrinks")
  // This method clears out the buttons before adding a new string to the page
  document.getElementById("placeholderHistory").innerHTML = "";
  // looped the searched ingredients array to add a button for each string in the array
  for (var i = 0; i < searchedIngredientsArray.length; i++) {
    // create
    var savedIngredient = document.createElement("button");
    // modify
    savedIngredient.innerHTML = searchedIngredientsArray[i];
    savedIngredient.setAttribute("class", "historyButtons");
    // append
    document.getElementById("placeholderHistory").append(savedIngredient);
  }
}
// Called function in the end to execute as soon as page loads
renderStorage();
*/