// function to get ID (only used once)
const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/', {
  method: 'POST',
});
return response;