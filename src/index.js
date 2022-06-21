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
    const result = await fetch('https://api.spotify.com/v1/tracks?market=CU&ids=6ydEhrdfzhI29D2NBAqUY1', {
        method: 'GET',
        headers: {
        'Authorization': 'Bearer ' + whatever
    }
    });
    const data = await result.json();
    console.log(data);
}
getTracks(token);

});