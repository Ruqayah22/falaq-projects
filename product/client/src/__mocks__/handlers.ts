//handlers.ts
import { http, HttpResponse } from "msw";

import products from "./products.json";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const cachedProducts = [...products];
let nextId = cachedProducts.length;

export const handlers = [
  // get all products
  http.get(`${BASE_URL}/products`, () => {
    return HttpResponse.json(cachedProducts);
  }),

  // get one product
  http.get(`${BASE_URL}/products/:id`, ({ params }) => {
    const { id } = params;
    const product = products.find((p) => p.id === Number(id));
    if (!product) {
      return new Response("Not Found", { status: 404 });
    }
    return HttpResponse.json(product);
  }),

  // create product
  // http.post(`${BASE_URL}/products`, async ({ request }) => {
  //   const newProduct = (await request.json()) as {
  //     id: 4;
  //     title: "test four";
  //     description: "test description four";
  //     price: 1500;
  //   };

  //   products.push(newProduct);

  //   return HttpResponse.json(newProduct, { status: 201 });
  // }),

  http.post(`${BASE_URL}/products`, async ({ request }) => {
    const payload = await request.clone().json();
    cachedProducts.push({
      id: ++nextId,
      ...payload,
    });
    return HttpResponse.json(payload);
  }),

  // updata product
  http.patch(`${BASE_URL}/products/:id`, async ({ request, params }) => {
    const { id } = params;
    const productId = Number(id);

    const payload = await request.clone().json();

    const index = cachedProducts.findIndex((p) => p.id === productId);

    if (index === -1) {
      return new Response("Not Found", { status: 404 });
    }

    cachedProducts[index] = {
      id: productId,
      ...payload,
    };

    return HttpResponse.json(cachedProducts[index]);
  }),

  // delete product
  http.delete(`${BASE_URL}/products/:id`, ({ params }) => {
    const { id } = params;
    const productId = Number(id);

    const index = cachedProducts.findIndex((p) => p.id === productId);

    if (index === -1) {
      return new Response("Not Found", { status: 404 });
    }

    const deletedProduct = cachedProducts[index];
    cachedProducts.splice(index, 1)[0];

    return HttpResponse.json(deletedProduct);
  }),

  http.get("/resource", () => {
    return HttpResponse.error();
  }),
  
];
