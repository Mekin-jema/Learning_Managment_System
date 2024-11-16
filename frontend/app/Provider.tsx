import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../Redux/store";

interface ProviderProps {
  childern: ReactNode; // you can make it any type
}

export function Providers({ childern }: ProviderProps) {
  return <Provider store={store}>{childern}</Provider>;
}
