import { map, catchError, of } from "rxjs";
import { ajax } from "rxjs/ajax";

import { ToDosResponseSchema, ToDoResponseSchema } from "../types";
import type { ToDosResponse, ToDoResponse, UpsertToDo } from "../types/toDo";

const BASE_URL = "http://localhost:3000";

export const getToDos = () =>
  ajax.get<ToDosResponse>(`${BASE_URL}/toDo`).pipe(
    map(({ response }) => ToDosResponseSchema.parse(response)),
    catchError(() => of([] as ToDosResponse)),
    map((toDos) => toDos.sort((a, b) => b.id - a.id))
  );

export const getToDo = (id: number | string) =>
  ajax.get<ToDoResponse>(`${BASE_URL}/toDo/${id}`).pipe(
    map(({ response }) => ToDoResponseSchema.parse(response)),
    catchError(() => of(null))
  );

export const createToDo = (payload: UpsertToDo) =>
  ajax<ToDoResponse>({
    url: `${BASE_URL}/toDo`,
    method: "POST",
    body: payload,
    headers: { "Content-Type": "application/json" },
  }).pipe(
    map(({ response }) => ToDoResponseSchema.parse(response)),
    catchError(() => of(null))
  );

export const updateToDo = (id: number | string, payload: UpsertToDo) =>
  ajax<ToDoResponse>({
    url: `${BASE_URL}/toDo/${id}`,
    method: "PATCH",
    body: payload,
    headers: { "Content-Type": "application/json" },
  }).pipe(
    map(({ response }) => ToDoResponseSchema.parse(response)),
    catchError(() => of(null))
  );

export const deleteToDo = (id: number | string) =>
  ajax.delete<ToDoResponse>(`${BASE_URL}/toDo/${id}`).pipe(
    map(({ response }) => ToDoResponseSchema.parse(response)),
    catchError(() => of(null))
  );
