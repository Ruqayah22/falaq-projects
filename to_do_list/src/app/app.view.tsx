// import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { useCreateAppStore } from "./app.context";
import { useObservable } from "../utils";
import '../style/index.css'
import * as z from "zod";

// type Inputs = {
//   text: string;
// };

// zod 
const Inputs = z.object({
  text: z.string(),
});

type Inputs = z.infer<typeof Inputs>;

export default function AppView() {
  const { register, handleSubmit, reset } = useForm<Inputs>();

//   const [items, setItems] = useState<string[]>([]);
  const {
    state: { items$ },
    actions: { addItem },
  } = useCreateAppStore();

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
