const likes = () => {const newLike = async () => {
    const response = await fetch(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/IdQnbnyUh784FAUyhm2C/likes/',
      {
        method: 'POST',
        body: JSON.stringify({
          item_id: '2C5ghIJDpPoe3CfHMGu71E6T',
        }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const like = await response.json();
    return like;
  };
  
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
}

export default likes;