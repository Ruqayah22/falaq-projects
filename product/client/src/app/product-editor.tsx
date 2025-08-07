import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";

import { useObservable } from "../utils";
import { UpsertProductSchema, type UpsertProduct } from "../types";
import { useAppStore } from "./app.context";

export const ProductEditor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpsertProduct>({ resolver: zodResolver(UpsertProductSchema) });

  const {
    state: { activeProduct$ },
    actions: { upsertProduct, setActiveProductById },
  } = useAppStore();

  const activeProduct = useObservable(activeProduct$);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<UpsertProduct> = (payload) => {
    upsertProduct({ payload, id: activeProduct?.id });
    reset();
    navigate("/");
  };

  useEffect(() => {
    if (activeProduct) reset(activeProduct);
    else
      reset({
        title: "",
        description: "",
        price: 0,
      });
  }, [activeProduct]);

  const { id } = useParams();

  useEffect(() => {
    setActiveProductById(id);
  }, [id]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        aria-label="title"
        className="inputText"
        {...register("title")}
        placeholder="Type something..."
      />
      <p aria-label="title-error" data-testid="error-title">
        {errors.title?.message}
      </p>
      <input
        aria-label="description"
        className="inputText"
        {...register("description")}
        placeholder="Type something..."
      />
      <p aria-label="description-error" data-testid="error-description">
        {errors.description?.message}
      </p>

      {/* {errors.description && (
        <p aria-label="description-error" data-testid="error-description">
          {errors.description.message}
        </p>
      )} */}

      <input
        aria-label="price"
        type="number"
        step="any"
        className="inputText"
        {...register("price", { valueAsNumber: true })}
        placeholder="Price..."
      />
      <p aria-label="price-error" data-testid="error-price">
        {errors.price?.message}
      </p>
      <input
        className="btn"
        type="submit"
        value={activeProduct ? "save" : "create"}
      />
    </form>
  );
};
