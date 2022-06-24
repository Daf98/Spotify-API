
const getComment = async (id) => {
  const response = await fetch(
    `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/IdQnbnyUh784FAUyhm2C/comments?item_id=${id}`,
    {
      method: "GET",
    }
  );
  const comment = await response.json();
  console.log(comment)
  return comment;
};

export default getComment;
