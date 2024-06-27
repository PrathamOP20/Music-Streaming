var i = 0;
var txt = 'Welcome to BeatBank, where music is more than just a sound'; /* The text */
var speed = 200; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("welcome-text").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  } else {
    document.getElementById("welcome-text").innerHTML = ''; // Clear previous text
    i = 0; // Reset index to restart typing effect
    setTimeout(typeWriter, speed);
  }
}

typeWriter();
