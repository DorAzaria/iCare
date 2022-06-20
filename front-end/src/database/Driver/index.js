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

  return await response.json();

};

const loadApplications = async (parameters) => {

  let url = '/api/apply';

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

  return await response.json();

};

const loadChat = async (parameters) => {

  let url = '/api/chat';

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
  }); const json = await response.json(); console.log('chat: ', json); return json;

  return await response.json();

};

const saveMessage = async (request) => {

  const body = JSON.stringify(request);

  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await fetch('/api/chat', {
    'method': 'POST',
    'headers': headers,
    'body': body,
  });

  return await response.json();

};

const DatabaseDriver = Object.freeze({
  registerUser,
  logInUser,
  saveJob,
  loadJobs,
  applyUser,
  loadApplications,
  loadChat,
  saveMessage,
});

export default DatabaseDriver;