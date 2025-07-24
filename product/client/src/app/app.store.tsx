import { shareReplay, Subject, switchMap, exhaustMap, merge, of } from "rxjs";

import {
  getProducts,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
} from "../api";
import { withInitialValue } from "../utils";
import type { UpsertProduct } from "../types";

export const createProductStore = () => {
  const setActiveProductById$ = new Subject<number | string | undefined>();

  const activeProduct$ = setActiveProductById$.pipe(
    switchMap((id) => (id ? getProduct(id) : of(null))),
    shareReplay(1)
  );

  const refreshProducts$ = new Subject<void>();

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

  const deleteProduct$ = new Subject<number | string>();

  const deletedProduct$ = deleteProduct$.pipe(
    exhaustMap((id) => deleteProduct(id)),
    shareReplay(1)
  );

  const triggers$ = merge(refreshProducts$, upsertedProduct$, deletedProduct$);

  const products$ = triggers$.pipe(
    switchMap(() => getProducts()),
    shareReplay(1)
  );

  return {
    state: {
      products$: withInitialValue(products$, []),
      upsertedProduct$: withInitialValue(upsertedProduct$, null),
      activeProduct$: withInitialValue(activeProduct$, null),
    },
    actions: {
      refreshProducts: () => refreshProducts$.next(),
      upsertProduct: ({
        id,
        payload,
      }: {
        id?: number | string;
        payload: UpsertProduct;
      }) => upsertProduct$.next({ id, payload }),
      deleteProduct: (id: number | string) => deleteProduct$.next(id),
      setActiveProductById: (id?: number | string) =>
        setActiveProductById$.next(id),
    },
  };
};
