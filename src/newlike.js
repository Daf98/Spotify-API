const newLike = async (id) => {
  const response = await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/aUOe0UAxqrqZevH0zybK/likes/',
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