import React, { useState } from 'react';

const GlobalContext = React.createContext([{}, () => {}]);

const GlobalProvider = (props) => {
  const [value, setValue] = useState();
  return (
    <GlobalContext.Provider value={[value, setValue]}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };