import { useContext } from "react";
import { GlobalUIContext, GlobalUIContextType } from "./GlobalUI";

export const useGlobalUI = (): GlobalUIContextType => {
  const context = useContext(GlobalUIContext);

  if (!context) {
    throw new Error(`No GlobalUIContext.Provider found!`);
  }

  return context;
};
