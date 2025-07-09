import { createContext, useContext, useRef } from "react";

import { createAppStore } from "./app.store";

export type AppStore = ReturnType<typeof createAppStore>;
export const AppStoreContext = createContext({} as AppStore);

export function useAppStore() {
    return useContext(AppStoreContext);
  }

export function useCreateAppStore() {
    
    const storeRef = useRef<AppStore| null>(null);
    if (storeRef.current === null) {
      storeRef.current = createAppStore();
    }

    const store = storeRef.current;
    
    return store;
  }