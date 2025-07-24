import { createContext, useContext, useRef } from "react";

import { createRegisterStore } from "./app.store";

export type RegisterStore = ReturnType<typeof createRegisterStore>;
export const AppStoreContext = createContext({} as RegisterStore);

export function useAppStore() {
  return useContext(AppStoreContext);
}

export function useCreateAppStore() {
  const storeRef = useRef<RegisterStore | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createRegisterStore();
  }

  const store = storeRef.current;

  return store;
}
