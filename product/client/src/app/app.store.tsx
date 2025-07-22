import { scan, shareReplay, Subject } from "rxjs";
import { withInitialValue } from "../utils";


type ProductItem = {
  id: number;
  title: string;
  description: string;
  price: number;
};

export const createProductStore = () => {
  // const addItem$ = new Subject<string | number>();
  const addItem$ = new Subject<ProductItem>();

  const items$ = addItem$.pipe(
    // scan((items, item) => [...items, item], [] as Array<string | number>),
    scan((items, item) => [...items, item], [] as Array<ProductItem>),
    shareReplay()
  );

  return {
    state: {
      items$: withInitialValue(items$, []),
    },
    actions: {
      // addItem: (item: string) => addItem$.next(item),
      addItem: (item: ProductItem) => addItem$.next(item),
      // editItem,
      // deleteItem,
    },
  };
};

