import React, { createContext, useState } from 'react';

const UserContext = createContext([{}, () => {}]);

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    username: '',
    email: '',
    id: '',
    isLoggedIn: null,
    profilePhotoUrl: 'default',
  });

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
