import { shareReplay, Subject, switchMap, exhaustMap, merge } from "rxjs";

import { getProducts, createProduct, updateProduct } from "../api";
import { withInitialValue } from "../utils";
import type { UpsertProduct } from "../types";

export const createProductStore = () => {
  const refreshProducts$ = new Subject<void>();

  // const createProduct$ = new Subject<UpsertProduct>();

  // const createdProduct$ = createProduct$.pipe(
  //   exhaustMap((payload) => createProduct(payload))
  // );

  const upsertProduct$ = new Subject<{
    id?: number | string;
    payload: UpsertProduct;
  }>();

  const upsertedProduct$ = upsertProduct$.pipe(
    exhaustMap(({ id, payload }) =>
      id ? updateProduct(id, payload) : createProduct(payload)
    ),
    shareReplay(1)
  );

  const triggers$ = merge(refreshProducts$, upsertedProduct$);

  const products$ = triggers$.pipe(
    switchMap(() => getProducts()),
    shareReplay(1)
  );

  return {
    state: {
      products$: withInitialValue(products$, []),
      upsertedProduct$: withInitialValue(upsertedProduct$, null),
    },
    actions: {
      refreshProducts: () => refreshProducts$.next(),
      // createProduct: (payload: UpsertProduct) => createProduct$.next(payload),
      upsertProduct: ({
        id,
        payload,
      }: {
        id?: number | string;
        payload: UpsertProduct;
      }) => upsertProduct$.next({ id, payload }),
    },
  };
};
