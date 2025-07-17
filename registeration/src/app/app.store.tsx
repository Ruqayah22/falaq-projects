import { scan, shareReplay, Subject } from "rxjs";
import { withInitialValue } from "../utils";

export const createRegisterStore = () => {
  const addItem$ = new Subject<string>();

  const items$ = addItem$.pipe(
    scan((items, item) => [...items, item], [] as Array<string>),
    shareReplay()
  );

  return {
    state: {
      items$: withInitialValue(items$, []),
    },
    actions: {
      addItem: (item: string) => addItem$.next(item),
    },
  };
};
