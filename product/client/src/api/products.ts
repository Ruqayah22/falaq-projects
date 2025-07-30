import { map, catchError, of } from "rxjs";
import { ajax } from "rxjs/ajax";

import { ProductsResponseSchema, ProductResponseSchema } from "../types";
import type {
  ProductsResponse,
  ProductResponse,
  UpsertProduct,
} from "../types/products";

const BASE_URL = import.meta.env.VITE_SERVER_URL;  //"http://localhost:3000";

export const getProducts = () =>
  ajax.get<ProductsResponse>(`${BASE_URL}/products`).pipe(
    map(({ response }) => ProductsResponseSchema.parse(response)),
    catchError(() => of([] as ProductsResponse)),
    map((products) =>
      products.sort((a, b) => b.id - a.id) // Sort products by descending ID
    )
  );

export const getProduct = (id: number | string) =>
  ajax.get<ProductResponse>(`${BASE_URL}/products/${id}`).pipe(
    map(({ response }) => ProductResponseSchema.parse(response)),
    catchError(() => of(null))
  );

export const deleteProduct = (id: number | string) =>
  ajax.delete<ProductResponse>(`${BASE_URL}/products/${id}`).pipe(
    map(({ response }) => ProductResponseSchema.parse(response)),
    catchError(() => of(null))
  );

export const createProduct = (payload: UpsertProduct) =>
  ajax<ProductResponse>({
    url: `${BASE_URL}/products`,
    method: "POST",
    body: payload,
    headers: { "Content-Type": "application/json" },
  }).pipe(
    map(({ response }) => ProductResponseSchema.parse(response)),
    catchError(() => of(null))
  );

export const updateProduct = (id: number | string, payload: UpsertProduct) =>
  ajax<ProductResponse>({
    url: `${BASE_URL}/products/${id}`,
    method: "PATCH",
    body: payload,
    headers: { "Content-Type": "application/json" },
  }).pipe(
    map(({ response }) => ProductResponseSchema.parse(response)),
    catchError(() => of(null))
  );
