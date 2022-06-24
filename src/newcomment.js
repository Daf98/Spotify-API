const newComment = async (id, userName, userComment) => {
  const response = await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/IdQnbnyUh784FAUyhm2C/comments/',
    {
      method: 'POST',
      body: JSON.stringify({
        item_id: id,
        username: userName,
        comment: userComment,
      }),
      headers: { 'Content-Type': 'application/json' },
    },
  );
  const comment = await response.json();
  return comment;
};

export default newComment;
