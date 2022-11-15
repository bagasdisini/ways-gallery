import React, { createContext, useReducer } from "react";
import { SpinnerCircular } from "spinners-react";

export const LoadingContext = createContext();

const reducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case "LOAD_SUCCESS":
      return (
        <SpinnerCircular
          enabled={false}
          size={30}
          thickness={100}
          speed={100}
          color="#2FC4B2"
          secondaryColor="rgba(0, 0, 0, 0.5)"
        />
      );
    case "LOAD_ERROR":
      return (
        <SpinnerCircular
          size={30}
          thickness={100}
          speed={100}
          color="#2FC4B2"
          secondaryColor="rgba(0, 0, 0, 0.5)"
        />
      );
    default:
      throw new Error();
  }
};

export const LoadingContextProvider = ({ children }) => {
  const [stateLoad, dispatchLoad] = useReducer(reducer);

  return (
    <LoadingContext.Provider value={[stateLoad, dispatchLoad]}>
      {children}
    </LoadingContext.Provider>
  );
};
