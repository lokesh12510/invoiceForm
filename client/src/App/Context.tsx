import React, { useReducer, useContext, createContext } from "react";

interface IState {
  loading: boolean;
  error: boolean;
  message: {
    type: string;
    data: string;
  };
}

const initialState = {
  loading: false,
  error: false,
  message: { type: "", data: "" },
};
const AppStateContext = createContext<{
  state: IState;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

export function useAppContext() {
  return useContext(AppStateContext);
}

// Global State for loading & Alert messages

export const AppStateProvider = ({ children }) => {
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "START_LOADING":
        return { ...state, loading: true };
      case "STOP_LOADING":
        return { ...state, loading: false };
      case "ERROR":
        return { ...state, loading: false, error: true };
      case "SHOW_MSG":
        return {
          ...state,
          loading: false,
          message: { type: action.payload.type, data: action.payload.message },
        };
      case "CLEAR_MSG":
        return {
          ...state,
          loading: false,
          message: { type: "", data: "" },
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};
