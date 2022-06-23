const getLike = async () => {
    const response = await fetch(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/aUOe0UAxqrqZevH0zybK/likes/',
      {
        method: 'GET',
      },
    );
    const like = await response.json();
    return like;
  };

export default getLike;