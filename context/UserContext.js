import React, { createContext, useState } from 'react';

const UserContext = createContext([{}, () => {}]);

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    id: '',
    imageUri: 'default',
    isLoggedIn: null,
  });

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
