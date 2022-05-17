const registerUser = async (request) => {

  const body = JSON.stringify(request);

  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await fetch('/api/register', {
    'method': 'POST',
    'headers': headers,
    'body': body,
  });

  return await response.json();

};

const logInUser = async (request) => {

  const body = JSON.stringify(request);

  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await fetch('/api/log-in', {
    'method': 'POST',
    'headers': headers,
    'body': body,
  });

  const text = await response.text(); console.log('text:\n', text);
  return JSON.parse(text);

  return await response.json();

};

const DatabaseDriver = Object.freeze({
  registerUser,
  logInUser,
});

export default DatabaseDriver;