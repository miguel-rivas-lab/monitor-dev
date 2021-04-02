import { useMemo } from "react";
import { FC, createContext, useReducer } from "react";

export type State = { showAssets: boolean };

export type Action = { type: "EXPAND_ASSETS" } | { type: "COLLAPSE_ASSETS" };

export const initialState: State = { showAssets: false };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "EXPAND_ASSETS": {
      return { ...state, showAssets: true };
    }
    case "COLLAPSE_ASSETS": {
      return { ...state, showAssets: false };
    }
    default: {
      return state;
    }
  }
};

export interface GlobalUIContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export const GlobalUIContext = createContext<GlobalUIContextType>(null!);

export const GlobalUIProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => {
    return { state, dispatch };
  }, [state]);

  return (
    <GlobalUIContext.Provider value={value}>
      {children}
    </GlobalUIContext.Provider>
  );
};
