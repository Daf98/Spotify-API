import "./style.css";
import image from "./spotitfy-img.png";
import newComment from "./newcomment.js";
import getComment from "./getcomment.js";

const { Buffer } = require("buffer/");

const spotifyAPI = () => {
  // add logo
  const logo = document.getElementById("logo-div");
  logo.innerHTML = `<img id="logo" src=${image} alt="logo" />`;

  const clientID = "54e1c1ed18694a4783e400e6647c8109";
  const clientSecret = "d88c4932b8cb456e976aeaedb74f4a42";

  // async function to get the token
  const getToken = async () => {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${clientID}:${clientSecret}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const data = await result.json();
    return data.access_token;
  };
  getToken().then((token) => {
    // async function to get songs
    const getTracks = async () => {
      const result = await fetch(
        "https://api.spotify.com/v1/tracks?market=CU&ids=2aoo2jlRnM3A0NyLQqMN2f%2C3uz0O62HqYoyRiWZjS61KK%2C5ghIJDpPoe3CfHMGu71E6T%2C57JVGBtBLCfHw2muk5416J%2C70LcF31zb1H0PyJoS1Sx1r%2C3dPQuX8Gs42Y7b454ybpMR",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await result.json();
      return data;
    };
    getTracks(token).then((tracks) => {
      const trackArray = tracks.tracks;
      // LOOP
      trackArray.forEach((track) => {
        console.log(trackArray);
        const trackName = track.name;
        const albumImg = track.album.images[0].url;
        const body = document.getElementById("main");
        body.innerHTML += `<section class="song">
        <h2><img id="album-img" src="${albumImg}" alt="album cover"></h2>
        <h2 id="id-container"><i class="fa-solid fa-heart"></i></h2>
        <h2>${trackName}</h2>
        <button class="comments">Comments</button>
        </section>
        `;
        const mainBody = document.querySelector("body");
        const active = document.querySelectorAll(".comments");
        for (let i = 0; i < active.length; i += 1) {
          active[i].addEventListener("click", () => {
            const section = document.createElement("section");
            section.className = "popup";
            const article = document.createElement("article");
            article.className = "pop-window";
            article.innerHTML = `<h2 class="img"><img class="pop-img" src="${trackArray[i].album.images[0].url}" alt="album cover"></h2>
            <h2 class="close-pop"><i class="fa-solid fa-x"></i></h2>
            <div class="description"><h2>${trackArray[i].name}</h2>
            <h2>by ${trackArray[i].artists[0].name}</h2>
            <h2>from ${trackArray[i].album.name}</h2>
            <h2>Released on ${trackArray[i].album.release_date}</h2>
            <div>
            <h2>Comments</h2>
            <ul id="commenter">
            </ul>
            </div>
            <h4>Add a comment<h4></div>
            <div class=form-box><form class='form' action='https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/IdQnbnyUh784FAUyhm2C/comments/'
            method='post'
            ><input 
            type="text"
            id="name"
            name="user"
            maxlength="30"
            placeholder="Your name"
            required/>
            <textarea
            class="ta"
            id="txt"
            name="user_txt"
            maxlength="200"
            placeholder="Your insights"
            required
            ></textarea>
            <button class="bt" type="submit">Comment</button></form></div>
            `;
            section.appendChild(article);
            mainBody.appendChild(section);
            const userName = document.getElementById("name");
            const userComment = document.getElementById("txt");
            const comment = document.querySelector(".form");
            comment.addEventListener("submit", (e) => {
              e.preventDefault();
              getComment(track.id).then((comments) => {
                comments.forEach((comment) => {
                  const userN = comment.username;
                  const userC = comment.comment;
                  const date = comment.creation_date;
                  const commentList = `<li class="score-list">${date}${userN}:${userC}</li>`;
                  document.getElementById("commenter").innerHTML += commentList;
                });
              });
              newComment(track.id, userName.value, userComment.value);
            });
            const popclose = document.querySelector(".fa-x");
            popclose.addEventListener("click", () => {
              section.remove(article);
            });
            getComment(track.id).then((comments) => {
              comments.forEach((comment) => {
                const userN = comment.username;
                const userC = comment.comment;
                const date = comment.creation_date;
                const commentList = `<li class="score-list">${date}${userN}:${userC}</li>`;
                document.getElementById("commenter").innerHTML += commentList;
              });
            });
          });
        }
        const likeButton = document.querySelectorAll(".fa-heart");
        likeButton.forEach((button) => {
          button.addEventListener("click", () => {
            // newLike(track.id);
          });
        });
      });
    });
  });
};
export default spotifyAPI;
