// Set the date of album release (no sooner than the end of May 2023)
const releaseDate = new Date('June 30, 2023 00:00:00').getTime();

// Update the countdown every second
const interval = setInterval(() => {
  // Get today's date and time
  const now = new Date().getTime();

  // Find the distance between now and the release date
  const distance = releaseDate - now;

  // Calculate days, hours, minutes and seconds remaining
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update the HTML elements with the remaining time
  document.getElementById('days').innerHTML = days + " : ";
  document.getElementById('hours').innerHTML = hours + " : ";
  document.getElementById('minutes').innerHTML = minutes + " : ";
  document.getElementById('seconds').innerHTML = seconds + " ";

  // If the release date is reached, clear the interval
  if (distance < 0) {
    clearInterval(interval);
    document.getElementById('countdown').innerHTML = '<h2>Album Release is Here!</h2>';
  }
}, 1000);


// Reviews
var reviews = [];

function addReview(event) {
    event.preventDefault(); // prevent the form submission from reloading the page
    const name = document.getElementById("name").value;
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const review = document.getElementById("review").value;
    const reviewObj = {
      name: name,
      rating: rating,
      review: review
    };
    reviews.push(reviewObj);
    displayReviews();
  }
  

function displayReviews() {
  let dataHtml = "";
  for (let i = 0; i < reviews.length; i++) {
    console.log(reviews[i].name)
    dataHtml += "<tr>";
    dataHtml += "<td>" + reviews[i].name + "</td>";
    dataHtml += "<td>" + reviews[i].rating + "</td>";
    dataHtml += "<td>" + reviews[i].review + "</td>";
    dataHtml += "</tr>";
  }
  document.getElementById("review-content").innerHTML = dataHtml;
}

function zoomIn() {
  var img = document.getElementById("zoom");
  img.style.transform = "scale(1.25)";
  setTimeout(zoomOut, 1000); 
}

function zoomOut() {
  var img = document.getElementById("zoom");
  img.style.transform = "scale(1)";
  // setTimeout(zoomIn, 1000); 
}
