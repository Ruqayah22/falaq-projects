import { scan, shareReplay, Subject } from "rxjs";
import { withInitialValue } from "../utils";

export const createRegisterStore = () => {
  const addItem$ = new Subject<string>();

  const itemsA$ = addItem$.pipe(
    scan((items, item) => [...items, item], [] as Array<string>),
    shareReplay()
  );

  // const updateItem$ = new Subject<string>();

  // const itemsU$ = updateItem$.pipe(
    
  //   shareReplay()
  // );

  // const deleteItem$ = new Subject<string>();

  // const itemsD$ = deleteItem$.pipe(
    
  //   shareReplay()
  // );


  return {
    state: {
      items$: withInitialValue(itemsA$, []),
    },
    actions: {
      addItem: (item: string) => addItem$.next(item),
    },
  };
};
