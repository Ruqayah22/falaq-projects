import { z } from "zod";

const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductsResponseSchema = z.array(ProductSchema);

export type ProductsResponse = z.infer<typeof ProductsResponseSchema>;

export const ProductResponseSchema = ProductSchema;

export type ProductResponse = z.infer<typeof ProductResponseSchema>;

export const UpsertProductSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(250),
});

export type UpsertProduct = z.infer<typeof UpsertProductSchema>;
