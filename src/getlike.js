const getLike = async () => {
  const response = await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/IdQnbnyUh784FAUyhm2C/likes/',
    {
      method: 'GET',
    },
  );
  const like = await response.json();
  return like;
};

export default getLike;