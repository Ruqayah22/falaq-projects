import { createContext, useContext, useRef } from "react";

import { createToDoStore } from "./app.store";

export type ToDoStore = ReturnType<typeof createToDoStore>;
export const AppStoreContext = createContext({} as ToDoStore);

export function useAppStore() {
  return useContext(AppStoreContext);
}

export function useCreateAppStore() {
  const storeRef = useRef<ToDoStore | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createToDoStore();
  }

  const store = storeRef.current;

  return store;
}
