// DayCounter.store.ts
import { scan, shareReplay,  Subject } from "rxjs"; //startWith,
import { withInitialValue } from "../utils";


export const CreateDayCounterStore = () => {
    const selectedDate$ = new Subject<Date | null>();

    const days$ = selectedDate$.pipe(
        // startWith(null),
        // scan((_prev, current) => current, null),
        scan<Date | null, Date | null>((_prev, current) => current, null),
        shareReplay(1)
    );
    return{
        state: {
            selectedDate$: withInitialValue(days$, null),
        },
        actions: {
            setDate: (date: Date) => selectedDate$.next(date)
        },
    };
};