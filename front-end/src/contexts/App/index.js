import React from 'react';

import StringsEnglish from './strings/English';
import ErrorsEnglish from './errors/English';

export const defaultContext = Object.freeze({
  strings: StringsEnglish,
  errors: ErrorsEnglish,
  app: null, // app component
  user: null, // logged-in user
});

const AppContext = React.createContext(defaultContext);

export default AppContext;
