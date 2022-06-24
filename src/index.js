import spotifyAPI from "./spotifyAPI.js";
import newLike from "./newlike.js";
import getLike from "./getlike.js";
//import comments from "./comments.js";

spotifyAPI();
// newLike();
// getLike();
//comments();
// const popBody = document.getElementById("pop-box");
// const commentPopup = document.querySelectorAll(".comments");
// const trackName = track.name;
// popBody.innerHTML = `
//         <h2><img id="album-img" src="${albumImg}" alt="album cover"></h2>
//         <h2 id="id-container"><i id="${track.id}"class="fa-solid fa-heart"></i></h2>
//         <h2 class="trackname">${trackName}<h2>`;
// const bandName = track.artists[0].name;
// const albumName = track.album.name;
// const albumImg = track.album.images[0].url;
// const releaseDate = track.album.release_date;
// for (let i = 0; i < commentPopup.length; i += 1) {
//   console.log(commentPopup.length);
//   commentPopup[i].addEventListener("click", () => {
//     const section = document.createElement("section");
//     section.className = "popup-box";
//     const article = document.createElement("article");
//     article.className = "popup-window";
//     article.innerHTML = `<section class=".popup-window">
//         <h2><img id="album-img" src="${albumImg}" alt="album cover"></h2>
//         <h2 id="id-container">Song <i id="${track.id}"class="fa-solid fa-heart"></i></h2>
//         <h2>${trackName}
//         <h2>by ${bandName}</h2>
//         <h2>from ${albumName}</h2>
//         <h2>Released on ${releaseDate}</h2>
//         </section>`;
//     section.appendChild(article);
//     body.appendChild(section);
//   });
// }
