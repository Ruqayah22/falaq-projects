// import { scan, shareReplay, Subject } from "rxjs";
// import { withInitialValue } from "../utils";


// type ProductItem = {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
// };

// export const createProductStore = () => {
//   // const addItem$ = new Subject<string | number>();
//   const addItem$ = new Subject<ProductItem>();

//   const items$ = addItem$.pipe(
//     // scan((items, item) => [...items, item], [] as Array<string | number>),
//     scan((items, item) => [...items, item], [] as Array<ProductItem>),
//     shareReplay()
//   );

//   return {
//     state: {
//       items$: withInitialValue(items$, []),
//     },
//     actions: {
//       // addItem: (item: string) => addItem$.next(item),
//       addItem: (item: ProductItem) => addItem$.next(item),
//     },
//   };
// };

import { Observable, merge, scan, shareReplay, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { withInitialValue } from "../utils";

type ProductItem = {
  id: number;
  title: string;
  description: string;
  price: number;
};

type Action =
  | { type: "add"; payload: ProductItem }
  | { type: "edit"; payload: ProductItem }
  | { type: "delete"; payload: number };

export const createProductStore = () => {
  const addItem$ = new Subject<ProductItem>();
  const editItem$ = new Subject<ProductItem>();
  const deleteItem$ = new Subject<number>();

  const action$: Observable<Action> = merge(
    addItem$.pipe(map((item): Action => ({ type: "add", payload: item }))),
    editItem$.pipe(map((item): Action => ({ type: "edit", payload: item }))),
    deleteItem$.pipe(map((id): Action => ({ type: "delete", payload: id })))
  );

  const items$ = action$.pipe(
    scan((items: ProductItem[], action: Action) => {
      switch (action.type) {
        case "add":
          return [...items, action.payload];
        case "edit":
          return items.map((item) =>
            item.id === action.payload.id ? action.payload : item
          );
        case "delete":
          return items.filter((item) => item.id !== action.payload);
      }
    }, []),
    shareReplay(1)
  );

  return {
    state: {
      items$: withInitialValue(items$, []),
    },
    actions: {
      addItem: (item: ProductItem) => addItem$.next(item),
      editItem: (item: ProductItem) => editItem$.next(item),
      deleteItem: (id: number) => deleteItem$.next(id),
    },
  };
};
