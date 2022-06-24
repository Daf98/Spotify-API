// Import assets
import '../style.css';
import image from '../spotitfy-img.png';
import newLike from './newlike.js';
import getLike from './getlike.js';
import newComment from './newcomment.js';
import getComment from './getcomment.js';
import commentCount, { increaseCount } from './commentcount.js';
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
        <button class="comments">Comments</button>
      </section>
      `;
      const mainBody = document.querySelector('body');
      const active = document.querySelectorAll('.comments');
      for (let i = 0; i < active.length; i += 1) {
        active[i].addEventListener('click', async () => {
          const section = document.createElement('section');
          section.className = 'popup';
          const article = document.createElement('article');
          article.className = 'pop-window';
          article.innerHTML = `

            <i class="fa-solid fa-x"></i>

          <h2 class="img">
            <img class="pop-img" src="${trackArray[i].album.images[0].url}" alt="album cover">
          </h2>
          <div class="description">
            <h2>${trackArray[i].name}</h2>
            <h2>by ${trackArray[i].artists[0].name}</h2>
            <h2>from ${trackArray[i].album.name}</h2>
            <h2>Released on ${trackArray[i].album.release_date}</h2>
          </div>
          <div class=comment-box">
            <h2 id=commentcount></h2>
            <ul id="commenter"></ul>
            </div>
          <h4>Add a comment<h4>
          <div class=form-box>
            <form class='form'
              action='https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/IdQnbnyUh784FAUyhm2C/comments/'
              method='post'>
              <input type="text" id="name" name="user" maxlength="30" placeholder="Your name" required/>
              <textarea class="ta" id="txt" name="user_txt" maxlength="200" placeholder="Your insights" required></textarea>
              <button class="bt" type="submit">Comment</button>
            </form>
          </div>
          `;
          section.appendChild(article);
          mainBody.appendChild(section);
          const userName = document.getElementById('name');
          const userComment = document.getElementById('txt');
          const comment = document.querySelector('.form');
          comment.addEventListener('submit', (e) => {
            const loading = document.createElement('li');
            loading.innerHTML = 'loading...';
            const container = document.getElementById('commenter');
            container.appendChild(loading);
            e.preventDefault();
            newComment(trackArray[i].id, userName.value, userComment.value);
            setTimeout(() => {
              getComment(trackArray[i].id).then(async (comments) => {
                container.removeChild(loading);
                const count = await increaseCount(trackArray[i].id);
                document.getElementById('commentcount').innerHTML = `${'Comment: '}${count}`;
                const userN = comments[comments.length - 1].username;
                const userC = comments[comments.length - 1].comment;
                const date = comments[comments.length - 1].creation_date;
                const commentList = `<li class="score-list">${date}${userN}:${userC}</li>`;
                document.getElementById('commenter').innerHTML += commentList;
              });
            }, 1000);
          });

          const popclose = document.querySelector('.fa-x');
          popclose.addEventListener('click', () => {
            section.remove(article);
          });

          const count = await commentCount(trackArray[i].id);
          document.getElementById('commentcount').innerHTML = `${'Comment: '}${count}`;
          getComment(trackArray[i].id).then((comments) => {
            comments.forEach((comment) => {
              const userN = comment.username;
              const userC = comment.comment;
              const date = comment.creation_date;
              const commentList = `<li class="score-list">${date}${userN}:${userC}</li>`;
              document.getElementById('commenter').innerHTML += commentList;
            });
          });
          // }
        });
      }
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