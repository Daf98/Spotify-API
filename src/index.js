import './style.css';
const Buffer = require('buffer/').Buffer;

const clientID = '54e1c1ed18694a4783e400e6647c8109';
const clientSecret = 'd88c4932b8cb456e976aeaedb74f4a42';

//async function to get the token
const getToken = async() => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
        'Authorization': 'Basic ' + Buffer.from(clientID + ':' + clientSecret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    })
    const data = await result.json();
    const realToken = data.access_token;
    return realToken;
    
}
getToken().then((token) => {
    //async function to get songs
const getTracks = async(whatever) => {
    const result = await fetch('https://api.spotify.com/v1/tracks?market=CU&ids=5ZTZL5UlpF3UZ8H7BhoI9N', {
        method: 'GET',
        headers: {
        'Authorization': 'Bearer ' + whatever
    }
    });
    const data = await result.json();
    return data;
}
getTracks(token).then((tracks) => {
    const trackArray = tracks.tracks[0];
    const trackName = trackArray.name;
    const bandName = trackArray.artists[0].name;
    const albumName = trackArray.album.name;
    const albumImg = trackArray.album.images[0].url;
    const releaseDate = trackArray.album.release_date;
    const body = document.getElementById('main');
    body.innerHTML = `<h2>Song: ${trackName}</h2>
    <h2>Band: ${bandName}</h2>
    <h2>Album: ${albumName}</h2>
    <h2>Release date: ${releaseDate}</h2>
    <h2>Cover:<br><img src="${albumImg}" alt="album cover">
    `
   })
});

