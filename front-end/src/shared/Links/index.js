const LINKS_BABYSITTER = [
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
    key: 'LABEL_JOBS',
    link: '/jobs',
  },
  {
    key: 'LABEL_REQUESTS',
    link: '/requests',
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