const spotifyID = 'PHb9A1g9ZDIkHyV3LWEp';
const getLike = async () => {
  const response = await fetch(
    `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${spotifyID}/likes/`,
    {
      method: 'GET',
    },
  );
  const like = await response.json();
  return like;
};

export default getLike;