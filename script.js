// Psuedo code
// 1) Create the object that will be used throughout the program
// 2) Create DOM Elements and their respective selectors
// 3) Create the inputs and buttons that will be used and their respective selectors
// 4) Create validation function for the input fields so the user knows what can be entered
// 5) Create event listeners so the buttons know what to execute when pressed
// 6) Create the function to update the inforation necessary that will display for the user
// 7) Create the function to save and load information from the local storage


// Sport Object
const Sport = {
  name: "Soccer",
  numberOfPlayers: 11,
  origin: "England",
  getSummary: function () {
    return `${Sport.name} is played with ${Sport.numberOfPlayers} players and originated in ${Sport.origin}`;
  },
};

// DOM Elements
const sportName = document.getElementById("sportName");
const sportPlayerCount = document.getElementById("sportPlayerCount");
const sportOrigin = document.getElementById("sportOrigin");
const sportSummary = document.getElementById("sportSummary");

// Input field Selectors
const sportNameInput = document.getElementById("sportNameInput");
const sportPlayerInput = document.getElementById("sportPlayerInput");
const sportOriginInput = document.getElementById("sportOriginInput");

// Button Selectors
const updateNameButton = document.getElementById("updateNameButton");
const updatePlayerButton = document.getElementById("updatePlayerButton");
const updateOriginButton = document.getElementById("updateOriginButton");


// // Function to validate inputs
function validateInput(input) {
  const value = input.value.trim();
  if (value === "") {
    alert("Please fill in this field.");
    input.focus();
    return false;
  }
  return true;
}


// Save Sport to Local Storage
function saveSportToLocalStorage() {
  console.log("Saving Sport to Local Storage...", Sport);
  localStorage.setItem("sport", JSON.stringify(Sport));
}

// Load Sport from Local Storage
function loadSportFromLocalStorage() {
  const savedSport = localStorage.getItem("sport");
  if (savedSport) {
    console.log("Loading Sport from Local Storage...");
    Object.assign(Sport, JSON.parse(savedSport)); // Update Sport object
  } else {
    console.log("No sport found in Local Storage, using default.");
  }
}

// Unified Update Function
function infoUpdate(input, property, textElement, displayText) {
  if (validateInput(input)) {
    Sport[property] = input.value.trim(); // Update the sport object
    textElement.textContent = `${displayText} ${Sport[property]}`; // Update the DOM
    saveSportToLocalStorage(); // Save the updated object to local storage
    const sport = JSON.parse(localStorage.getItem("sport"));
    console.log("🚀 ~ infoUpdate ~ sport:", sport)
    sportSummary.textContent = `${sport.name} is played with ${Sport.numberOfPlayers} players and originated in ${Sport.origin}`; // Update DOM Element
    input.value = ""; // Clear the input field
  }
}

// Add event Listener for All Buttons
updateNameButton.addEventListener("click", () => {
  infoUpdate(sportNameInput, "name", sportName, "The name of my favorite sport is", sportName);
});

updatePlayerButton.addEventListener("click", () => {
    infoUpdate(sportPlayerInput, "numberOfPlayers", sportPlayerCount, "The number of players that are in this sport is", sportPlayerCount )
});

updateOriginButton.addEventListener("click", () => {
    infoUpdate(sportOriginInput, "sportOrigin", sportOrigin, "This sport was created in", sportOrigin  )
});

// Load Movie from Local Storage on Page Load
loadSportFromLocalStorage();

// Initial Render
sportName.textContent = `The name of my favorite sport is: ${Sport.name}.`;
sportOrigin.textContent = `This sport was created in ${Sport.origin}`;
sportPlayerCount.textContent = `The number of players that are in this sport is: ${Sport.numberOfPlayers}`;
sportSummary.textContent += `${Sport.name} is played with ${Sport.numberOfPlayers} players and originated in ${Sport.origin}`;
