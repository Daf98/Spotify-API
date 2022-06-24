// Import assets
import '../style.css';
import image from '../spotitfy-img.png';
import newLike from './newlike.js';
import getLike from './getlike.js';
// Declare song IDs
const id1 = '2o4AknH1hXnleCRW2rH45w';
const id2 = '2C3GfOAdcoc3X5GPiiXmpBjK';
const id3 = '2C2mLgOcRkEgq89j8WstUpui';
const id4 = '2C2fuYa3Lx06QQJAm0MjztKr';
const id5 = '2C0d28khcov6AiegSCpG5TuT';
const id6 = '2C5n6RDaGFSN88oRWuGtYAIN';
// Declare assets
const {
  Buffer,
} = require('buffer/');

const clientID = '54e1c1ed18694a4783e400e6647c8109';
const clientSecret = 'd88c4932b8cb456e976aeaedb74f4a42';
const logo = document.getElementById('logo-div');
/// Functions
// Add the logo
const addLogo = () => {
  logo.innerHTML = `<img id="logo" src=${image} alt="logo" />`;
};
addLogo();
// Fetch the token
const getToken = async () => {
  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${clientID}:${clientSecret}`,
      ).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const data = await result.json();
  const realToken = data.access_token;
  return realToken;
};
// Fetch the songs
getToken().then((token) => {
  const getTracks = async (accessToken) => {
    const result = await fetch(
      `https://api.spotify.com/v1/tracks?market=CU&ids=${id1}%${id2}%${id3}%${id4}%${id5}%${id6}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const data = await result.json();
    return data;
  };
  getTracks(token).then((tracks) => {
    const trackArray = tracks.tracks;
    // Loop through each track
    for (let i = 0; i < trackArray.length; i += 1) {
      const track = trackArray[i];
      const trackName = track.name;
      const albumImg = track.album.images[0].url;
      const body = document.getElementById('main');
      body.innerHTML
      += `<section class="song">
        <h2><img id="album-img" src="${albumImg}" alt="Album cover"></h2>
        <div class="title-container">
          <h2 class ="song-counter"></h2>
          <i class="fa-solid fa-heart"></i>
        </div>
        <div class="song-container">
          <h2 class="unique-id"></h2>
        </div>
        <h2>${trackName}</h2>
        <button>Comments</button>
      </section>
      `;
    }
    // Count items
    const counter = () => {
      const songCounter = document.querySelectorAll('.song-counter');
      let count = 0;
      while (trackArray.length > count) {
        songCounter[count].innerHTML += `Song ${count + 1}`;
        count += 1;
      }
    };
    counter();
    // Add likes to the Involvement API
    const uniqueId = document.querySelectorAll('.unique-id');
    const likeButton = document.querySelectorAll('.fa-heart');
    // Update likes on the screen
    for (let i = 0; i < likeButton.length; i += 1) {
      likeButton[i].addEventListener('click', () => {
        getLike().then((id) => {
          newLike(id[i].item_id);
          id[i].likes += 1;
          uniqueId[i].textContent = `${id[i].likes} likes`;
        });
      });
    }
    // Show likes when the page loads
    getLike().then((id) => {
      for (let i = 0; i < id.length; i += 1) {
        uniqueId[i].textContent = `${id[i].likes} likes`;
      }
    });
  });
});

export {
  addLogo,
  getToken,
};