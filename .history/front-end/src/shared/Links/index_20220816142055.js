const LINKS_BABYSITTER = [
  {
    key:'LABEL_HOME',
    link:'/'
  },
  // {
  //   key:'LABEL_CHATS',
  //   link:'/chat'
  // },
  {
    key:'LABEL_FAMILIES',
    link:'/families'
  },  
  {
    key: 'LABEL_JOBS',
    link: '/jobs',
  },
  {
    key: 'LABEL_REQUESTS',
    link: '/requests',
  },
];

const LINKS_PARENT = [
  {
    key:'LABEL_HOME',
    link:'/'
  },
  // {
  //   key:'LABEL_CHATS',
  //   link:'/chat'
  // },
  {
    key:'LABEL_SITTERS',
    link:'/sitters'
  },    
  {
    key: 'LABEL_JOBS',
    link: '/jobs',
  },
  {
    key: 'LABEL_REQUESTS',
    link: '/requests',
  },
  {
    key:'LABEL_WATCHLIST',
    link:'/watchlist'
  },      
];


const MAP_LINKS = {
  'babysitter': LINKS_BABYSITTER,
  'parent': LINKS_PARENT,
};

const Links = Object.freeze({
  LINKS_BABYSITTER,
  LINKS_PARENT,
  MAP_LINKS,
});

export default Links;