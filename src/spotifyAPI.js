import './style.css';
import image from './spotitfy-img.png';
import newLike from './newlike.js';
import getLike from './getlike.js';

const {
  Buffer,
} = require('buffer/');

const spotifyAPI = () => {
  // add logo
  const logo = document.getElementById('logo-div');
  logo.innerHTML = `<img id="logo" src=${image} alt="logo" />`;
  const clientID = '54e1c1ed18694a4783e400e6647c8109';
  const clientSecret = 'd88c4932b8cb456e976aeaedb74f4a42';

  // async function to get the token
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
  getToken().then((token) => {
    // async function to get songs
    const getTracks = async (whatever) => {
      const result = await fetch(
        'https://api.spotify.com/v1/tracks?market=CU&ids=2aoo2jlRnM3A0NyLQqMN2f%2C3uz0O62HqYoyRiWZjS61KK%2C5ghIJDpPoe3CfHMGu71E6T%2C57JVGBtBLCfHw2muk5416J%2C70LcF31zb1H0PyJoS1Sx1r%2C3dPQuX8Gs42Y7b454ybpMR', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${whatever}`,
          },
        },
      );
      const data = await result.json();
      return data;
    };
    getTracks(token).then((tracks) => {
      const trackArray = tracks.tracks;
      // GET TRACKS LOOP
      for (let i = 0; i < trackArray.length; i += 1) {
        const track = trackArray[i];
        const trackName = track.name;
        const bandName = track.artists[0].name;
        const albumName = track.album.name;
        const albumImg = track.album.images[0].url;
        const releaseDate = track.album.release_date;
        const body = document.getElementById('main');
        body.innerHTML += `<section class="song">
        <h2><img id="album-img" src="${albumImg}" alt="album cover"></h2>
        <div class="song-container"><h2 class="unique-id"></h2><i class="fa-solid fa-heart"></i></div>
        <h2>${trackName}
        <h2>by ${bandName}</h2>
        <h2>from ${albumName}</h2>
        <h2>Released on ${releaseDate}</h2>  
        <button>Comments</button>
        </section>
        `;
        const likeButton = document.querySelectorAll('.fa-heart');
        for (let d = 0; d < likeButton.length; d += 1) {
          likeButton[d].addEventListener('click', () => {
            newLike(trackArray[i].id);
          });
        }
      }
      const uniqueId = document.querySelectorAll('.unique-id');
      const likeButton = document.querySelectorAll('.fa-heart');
      for (let i = 0; i < likeButton.length; i += 1) {
        likeButton[i].addEventListener('click', () => {
          getLike().then((id) => {
            for (let i = 0; i < id.length; i += 1) {
              uniqueId[i].textContent = id[i].likes;
            }
          });
        });
      }

      getLike().then((id) => {
        for (let i = 0; i < id.length; i += 1) {
          uniqueId[i].textContent = id[i].likes;
        }
      });
    });
  });
};

export default spotifyAPI;