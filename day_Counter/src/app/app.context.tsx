import  { createContext, useContext, useRef } from "react";
import { CreateDayCounterStore } from "./app.store";


export type DayStore = ReturnType<typeof CreateDayCounterStore>;
export const DayStoreContext = createContext({} as DayStore);

export function useDayStore() {
    return useContext(DayStoreContext);
}

export function useCreateDayStore() {
    const dayRef = useRef<DayStore | null>(null);
    if(dayRef.current === null){
        dayRef.current = CreateDayCounterStore();
    }
    const day =dayRef.current;

    return day;
}