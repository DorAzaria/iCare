const queryLine = (parameters) => {

  const array = [];

  Object.keys(parameters).forEach((key) => {

    const value = parameters[key];
    const chunk = `${ key }=${ value }`;

    array.push(chunk);

  });

  return array.join('&');

};

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

  return await response.json();

};

const saveJob = async (request) => {

  const body = JSON.stringify(request);

  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await fetch('/api/jobs', {
    'method': 'POST',
    'headers': headers,
    'body': body,
  });

  return await response.json();

};

const loadJobs = async (parameters) => {

  let url = '/api/jobs';

  if (parameters) {

    const searchParams = queryLine(parameters);
    url = `${ url }?${ searchParams }`;

  }

  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    'method': 'GET',
    'headers': headers,
  });

<<<<<<< HEAD
  return await response.json();

};

const applyUser = async (request) => {

  const body = JSON.stringify(request);

  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await fetch('/api/apply', {
    'method': 'POST',
    'headers': headers,
    'body': body,
  });

=======
>>>>>>> f90934e74bea4c80cdfc1ca59ce3985dc9d34365
  return await response.json();

};

<<<<<<< HEAD
const loadApplications = async (parameters) => {

  let url = '/api/applications';

  if (parameters) {

    const searchParams = queryLine(parameters);
    url = `${ url }?${ searchParams }`;

  }
=======
const applyUser = async (request) => {

  const body = JSON.stringify(request);
>>>>>>> f90934e74bea4c80cdfc1ca59ce3985dc9d34365

  const headers = {
    'Content-Type': 'application/json',
  };

<<<<<<< HEAD
  const response = await fetch(url, {
    'method': 'GET',
    'headers': headers,
  });

  const text = await response.text(); console.log('text: ', text);
  return JSON.parse(text);

=======
  const response = await fetch('/api/apply', {
    'method': 'POST',
    'headers': headers,
    'body': body,
  });

>>>>>>> f90934e74bea4c80cdfc1ca59ce3985dc9d34365
  return await response.json();

};

const DatabaseDriver = Object.freeze({
  registerUser,
  logInUser,
  saveJob,
  loadJobs,
  applyUser,
<<<<<<< HEAD
  loadApplications,
=======
>>>>>>> f90934e74bea4c80cdfc1ca59ce3985dc9d34365
});

export default DatabaseDriver;