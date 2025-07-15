// import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';

import { useAppStore } from "./app.context";
import { useObservable } from "../utils";
import '../style/index.css'
import * as z from "zod";

// type Inputs = {
//   text: string;
// };

// zod 
const InputsSchema = z.object({
  text: z.string().min(1).max(10),
});

type Inputs = z.infer<typeof InputsSchema>;

export default function AppView() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(InputsSchema),
  });

//   const [items, setItems] = useState<string[]>([]);
  const {
    state: { items$ },
    actions: { addItem },
  } = useAppStore();

  const ToDoItems = useObservable(items$);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // setItems((prev) => [...prev, data.text]);
    addItem(data.text)
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="inputText"
          {...register("text")}
          placeholder="Type something..."
        />
        <p>{errors.text?.message}</p>
        <input className="btn" type="submit" />

        <ul>
          {ToDoItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </form>
    </div>
  );
}
