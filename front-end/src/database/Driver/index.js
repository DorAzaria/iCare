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
  }); 
  
  /*
  const json = await response.json(); 
  console.log('chat: ', json); 
  return json;
  */

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


/*All Sitters Page*/
const loadUsers = async (parameters) => {

  let url = '/api/users';
  

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

/*All Sitters Page*/
const filterSitters = async (parameters) => {

  let url = '/api/filter_sitters';
  

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


/*filter job page*/
const filterJobs = async (parameters) => {

  let url = '/api/filter_jobs';
  

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


/*All Sitters Page*/
const filterParents = async (parameters) => {

  let url = '/api/filter_parents';
  

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

/*All Reviews*/
const loadReviews = async (parameters) => {

  let url = '/api/reviews';
  

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

//save Review
const saveReview = async (request) => {

  const body = JSON.stringify(request);

  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await fetch('/api/reviews', {
    'method': 'POST',
    'headers': headers,
    'body': body,
  });

  return await response.json();

};

/*All Reviews*/
const loadComments = async (parameters) => {

  let url = '/api/comments';
  

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

//save Comment
const saveComment = async (request) => {

  const body = JSON.stringify(request);

  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await fetch('/api/comments', {
    'method': 'POST',
    'headers': headers,
    'body': body,
  });

  return await response.json();

};


//save Reply
const saveReply = async (request) => {

  const body = JSON.stringify(request);

  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await fetch('/api/replys', {
    'method': 'POST',
    'headers': headers,
    'body': body,
  });

  return await response.json();

};
/*Load Replys*/
const loadReplys = async (parameters) => {

  let url = '/api/replys';
  

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

/*Load Replys*/
const loadVotes = async (parameters) => {

  let url = '/api/votes';
  

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

//save Vote
const saveVote = async (request) => {

  const body = JSON.stringify(request);

  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await fetch('/api/votes', {
    'method': 'POST',
    'headers': headers,
    'body': body,
  });

  return await response.json();

};

/*load watches*/
const loadWatches = async (parameters) => {

  let url = '/api/watches';
  

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


//save Vote
const saveWatch = async (request) => {

  const body = JSON.stringify(request);

  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await fetch('/api/watches', {
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
  filterJobs,
  applyUser,
  loadApplications,
  loadChat,
  saveMessage,

  loadUsers,
  filterSitters,

  loadReviews,
  saveReview,

  loadComments,
  saveComment,

  saveReply,
  loadReplys,

  loadVotes,
  saveVote,

  loadWatches,
  saveWatch,

  filterParents

});



export default DatabaseDriver;