import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";

import { useObservable } from "../utils";
import { UpsertToDoSchema, type UpsertToDo } from "../types";
import { useAppStore } from "./app.context";

export const ToDoForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpsertToDo>({ resolver: zodResolver(UpsertToDoSchema) });

  const {
    state: { activeToDo$ },
    actions: { upsertToDo, setActiveToDoById },
  } = useAppStore();

  const activeToDos = useObservable(activeToDo$);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<UpsertToDo> = (payload) => {
    upsertToDo({ payload, id: activeToDos?.id });
    reset();
    navigate("/");
  };

  useEffect(() => {
    if (activeToDos) reset(activeToDos);
    else
      reset({
        text: "",
      });
  }, [activeToDos]);

  const { id } = useParams();

  useEffect(() => {
    setActiveToDoById(id);
  }, [id]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        aria-label="title"
        className="inputText"
        {...register("text")}
        placeholder="Type something..."
      />
      <p>{errors.text?.message}</p>

      <input
        className="btn"
        type="submit"
        value={activeToDos ? "save" : "create"}
      />
    </form>
  );
};
