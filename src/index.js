// write your code here


const baseURL = "http://localhost:3000/ramens";

// DOM elements
const ramenMenu = document.getElementById("ramen-menu");
const ramenDetail = document.getElementById("ramen-detail");
const ratingDisplay = document.getElementById("rating-display");
const commentDisplay = document.getElementById("comment-display");
const newRamenForm = document.getElementById("new-ramen");

// Load all ramen images on page load
document.addEventListener("DOMContentLoaded", () => {
  fetchRamen();
});

// Fetch all ramen from the server
function fetchRamen() {
  fetch(baseURL)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((ramen) => {
        displayRamenImage(ramen);
      });

      // Display first ramen details on load (Advanced Deliverable)
      if (data.length > 0) displayRamenDetails(data[0]);
    });
}

// Display a ramen image in the ramen-menu div
function displayRamenImage(ramen) {
  const img = document.createElement("img");
  img.src = ramen.image;
  img.alt = ramen.name;

  img.addEventListener("click", () => displayRamenDetails(ramen));

  ramenMenu.appendChild(img);
}

// Display ramen details in ramen-detail and update rating and comment
function displayRamenDetails(ramen) {
  const detailImage = ramenDetail.querySelector(".detail-image");
  const detailName = ramenDetail.querySelector(".name");
  const detailRestaurant = ramenDetail.querySelector(".restaurant");

  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
}

// Handle new ramen form submission
newRamenForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newRamen = {
    name: event.target["new-name"].value,
    restaurant: event.target["new-restaurant"].value,
    image: event.target["new-image"].value,
    rating: event.target["new-rating"].value,
    comment: event.target["new-comment"].value,
  };

  // Add new ramen to the menu
  displayRamenImage(newRamen);

  // Reset the form
  newRamenForm.reset();
});
