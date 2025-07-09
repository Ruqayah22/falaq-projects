import { startWith, Subject, shareReplay, scan } from "rxjs";
import { withInitialValue } from "../utils";


export const createAppStore = () => {
    const incrementBy$ = new Subject<number>()

    const count$ = incrementBy$.pipe(startWith(0),
    scan((accumulated, value) => accumulated + value, 0),
    shareReplay())

    return {
        state: {
            count$: withInitialValue(count$, 0)
        },
        actions: {
            incrementByOne: () => incrementBy$.next(1),
            decrementByOne: () => incrementBy$.next(-1),
        }
    }
}