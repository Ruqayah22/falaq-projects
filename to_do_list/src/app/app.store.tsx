import { scan, shareReplay, Subject } from "rxjs";

export const createToDoStore = () => {

const addItem$ = new Subject<string>();

const items$ = addItem$.pipe(
  scan((items, item) => [...items, item], [] as Array<string>),
  shareReplay()
);

  return {
    state: {
      items: items$,
    },
    actions: {
      addItem: (item: string) => addItem$.next(item)
    },
  };
};

