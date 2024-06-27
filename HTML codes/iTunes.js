const searchForm = document.querySelector('#search-form');
const filterBar = document.querySelector('#filter-bar');
const maxDurationInput = filterBar.querySelector('#max-duration');
const explicitInput = filterBar.querySelector('#explicit');
const filterBtn = filterBar.querySelector('#filter-btn');
const clearFilterBtn = filterBar.querySelector('#clear-filter-btn');
const resultsContainer = document.querySelector('#results-container');
const results = document.querySelector('#results');


let songs = [];
let currentSong = null;

// Function to display the songs on the page
function displaySongs(songsToDisplay) {
  if (songsToDisplay.length === 0) {
    results.innerHTML = '<p>No result found</p>';
    return;
  }
  let html = '';
  for (let i = 0; i < songsToDisplay.length; i++) {
    const song = songsToDisplay[i];
    const artistName = song.artistName;
    const trackName = song.trackName;
    const bgColor = i % 2 === 0 ? 'rgb(147,97,92)' : 'rgb(230,216,215)';
    html += `
      <div class="song" style="background-color: ${bgColor}">
        <img src="${song.artworkUrl100}">
        <h3 class="track-name">${trackName}</h3>
        <p class="artist-name">${artistName}</p>
        <p>Duration: ${song.trackTimeMillis/1000} seconds</p>
        <p>Explicit: ${song.trackExplicitness}</p>
        <audio controls src="${song.previewUrl}" data-index="${i}"></audio>
      </div>
    `;
  }
  results.innerHTML = html;
}


// Function to filter the songs based on duration and explicitness
function filterSongs() {

  const maxDuration = maxDurationInput.valueAsNumber * 60000 || Infinity;
  const explicit = explicitInput.value;

  const filteredSongs = songs.filter(song => {
    const duration = song.trackTimeMillis ;
    let isExplicit = true;

    if (explicit === 'Yes') {
      isExplicit = (song.trackExplicitness === 'explicit');
    } else if (explicit === 'No') {
      isExplicit = (song.trackExplicitness === 'notExplicit');
    }

    return   duration <= maxDuration && isExplicit;
  });

  displaySongs(filteredSongs);
}



// Function to pause the current song
function pauseCurrentSong() {
  if (currentSong !== null) {
    currentSong.pause();
    currentSong = null;
  }
}

// Event listener for the filter button
filterBtn.addEventListener('click', filterSongs);

// Event listener for the clear filter button
clearFilterBtn.addEventListener('click', () => {
  maxDurationInput.value = '';
  explicitInput.value = 'all';
  pauseCurrentSong();
  displaySongs(songs);
});

// Event listener for the search form
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const searchInput = searchForm.querySelector('input[name="search-input"]').value;
  const response = await fetch(`https://itunes.apple.com/search?term=${searchInput}&entity=song&limit=10`);
  const data = await response.json();
  songs = data.results;
  pauseCurrentSong();
  displaySongs(songs);
});

// Function to play a song
function playSong(audioElement) {
  const index = parseInt(audioElement.dataset.index);
  const song = songs[index];
  if (currentSong !== null) {
    currentSong.pause();
  }
  currentSong = audioElement;
  audioElement.play();
  audioElement.addEventListener('ended', () => {
    currentSong = null;
  });
}


// Event listener for the audio elements
results.addEventListener('click', (event) => {
  const audioElement = event.target.closest('audio');
  if (audioElement !== null) {
    playSong(audioElement);
  }
});


