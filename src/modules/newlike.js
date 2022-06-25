const spotifyID = 'PHb9A1g9ZDIkHyV3LWEp';
const newLike = async (id) => {
  const response = await fetch(
    `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${spotifyID}/likes/`,
    {
      method: 'POST',
      body: JSON.stringify({
        item_id: id,
      }),
      headers: { 'Content-Type': 'application/json' },
    },
  );
  const like = await response.json();
  return like;
};
export default newLike;