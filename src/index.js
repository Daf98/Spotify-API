import spotifyAPI from "./spotifyAPI.js";

spotifyAPI();

const newLike = async () => {
  const response = await fetch(
    "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/IdQnbnyUh784FAUyhm2C/likes/",
    {
      method: "POST",
      body: JSON.stringify({
        item_id: "2C5ghIJDpPoe3CfHMGu71E6T",
      }),
      headers: { "Content-Type": "application/json" },
    }
  );
  const id = await response.json();
  return id;
};
newLike();

const getLike = async () => {
  const response = await fetch(
    "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/IdQnbnyUh784FAUyhm2C/likes/",
    {
      method: "GET",
    }
  );
  const id = await response.json();
  console.log(id);
  return id;
};
getLike();