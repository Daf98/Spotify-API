/* eslint-disable no-unused-vars */
const comments = () => {
  const newComment = async () => {
    const response = await fetch(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/PHb9A1g9ZDIkHyV3LWEp/comments/',
      {
        method: 'POST',
        body: JSON.stringify({
          item_id: '2C5ghIJDpPoe3CfHMGu71E6T',
          username: 'Fabien',
          comment: 'I hate this song. Fuck Kurt Cobain',
        }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const comment = await response.json();
    return comment;
  };
  // newComment();

  const getComment = async () => {
    const response = await fetch(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/PHb9A1g9ZDIkHyV3LWEp/comments?item_id=2C5ghIJDpPoe3CfHMGu71E6T',
      {
        method: 'GET',
      },
    );
    const comment = await response.json();
    return comment;
  };
// getComment();
};
export default comments;