import { createContext, useContext, useRef } from "react";

import { createProductStore } from "./app.store";

export type ProductStore = ReturnType<typeof createProductStore>;
export const AppStoreContext = createContext({} as ProductStore);

export function useAppStore() {
  return useContext(AppStoreContext);
}

export function useCreateAppStore() {
  const storeRef = useRef<ProductStore | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createProductStore();
  }

  const store = storeRef.current;

  return store;
}
