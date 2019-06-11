import React, {createContext, useReducer } from 'react';

const authInitial = {
  user: {
    id: 1234,
    username: 'guest'
  }
};

const themeInitial = {
  style: {
    root: {
      backgroundColor: 'pink'
    }
  }
}

const authReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return { ...state, user: action.payload }
    case "LOGOUT":
      return { ...state, user: null }
    default:
      return { ...state }
  }
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE":
      return { ...state, style: action.payload }
    default:
      return { ...state }
  }
}

const SampleContext = createContext(Object.assign({}, authInitial, themeInitial));
const SampleProvider = props => {
  const [authState, authDispatch] = useReducer(authReducer, authInitial);
  const [themeState, themeDispatch] = useReducer(themeReducer, themeInitial);

  return (
    <SampleContext.Provider value={{
      authState,
      authDispatch,
      themeState,
      themeDispatch,
      }}
    >
      {props.children}
    </SampleContext.Provider>
  )
};

export { SampleContext };
export default SampleProvider;