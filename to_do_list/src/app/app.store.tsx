// import { scan, shareReplay, Subject } from "rxjs";
// import  { withInitialValue } from "../utils";

// export const createToDoStore = () => {

// const addItem$ = new Subject<string>();

// const items$ = addItem$.pipe(
//   scan((items, item) => [...items, item], [] as Array<string>),
//   shareReplay()
// );

//   return {
//     state: {
//       items$: withInitialValue(items$, []),
//     },
//     actions: {
//       addItem: (item: string) => addItem$.next(item),
//     },
//   };
// };

import { shareReplay, Subject, switchMap, exhaustMap, merge, of } from "rxjs";

import { getToDos, createToDo, updateToDo, getToDo, deleteToDo } from "../api";
import { withInitialValue } from "../utils";
import type { UpsertToDo } from "../types";

export const createToDoStore = () => {
  const setActiveToDoById$ = new Subject<number | string | undefined>();

  const activeToDo$ = setActiveToDoById$.pipe(
    switchMap((id) => (id ? getToDo(id) : of(null))),
    shareReplay(1)
  );

  const refreshToDos$ = new Subject<void>();

  const upsertToDo$ = new Subject<{
    id?: number | string;
    payload: UpsertToDo;
  }>();

  const upsertedToDo$ = upsertToDo$.pipe(
    exhaustMap(({ id, payload }) =>
      id ? updateToDo(id, payload) : createToDo(payload)
    ),
    shareReplay(1)
  );

  const deleteToDo$ = new Subject<number | string>();

  const deletedToDo$ = deleteToDo$.pipe(
    exhaustMap((id) => deleteToDo(id)),
    shareReplay(1)
  );

  const triggers$ = merge(refreshToDos$, upsertedToDo$, deletedToDo$);

  const toDos$ = triggers$.pipe(
    switchMap(() => getToDos()),
    shareReplay(1)
  );

  return {
    state: {
      toDos$: withInitialValue(toDos$, []),
      upsertedToDo$: withInitialValue(upsertedToDo$, null),
      activeToDo$: withInitialValue(activeToDo$, null),
    },
    actions: {
      refreshToDos: () => refreshToDos$.next(),
      upsertToDo: ({
        id,
        payload,
      }: {
        id?: number | string;
        payload: UpsertToDo;
      }) => upsertToDo$.next({ id, payload }),
      deleteTodo: (id: number | string) => deleteToDo$.next(id),
      setActiveToDoById: (id?: number | string) => setActiveToDoById$.next(id),
    },
  };
};
