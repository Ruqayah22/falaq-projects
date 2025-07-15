import { useForm, type SubmitHandler } from "react-hook-form";

import { useCreateAppStore } from "./app.context";
import { useObservable } from "../utils";
import "../style/index.css";
import * as z from "zod";


const Inputs = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  password: z.string(),
});

type Inputs = z.infer<typeof Inputs>;

export default function AppView() {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const {
    state: { items$ },
    actions: { addItem },
  } = useCreateAppStore();

  const registerItems = useObservable(items$);
    

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addItem(data.firstName);
    addItem(data.lastName);
    addItem(data.email);
    addItem(data.password);
    reset();
    // console.log(data);
    
  };

  console.log(registerItems);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="inputText"
          {...register("firstName")}
          placeholder="Type something..."
        />
        <input
          className="inputText"
          {...register("lastName")}
          placeholder="Type something..."
        />
        <input
          className="inputText"
          {...register("email")}
          placeholder="Type something..."
        />
        <input
          className="inputText"
          {...register("password")}
          placeholder="Type something..."
        />

        <input className="btn" type="submit" />

        {/* <ul>
          {registerItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
         */}
      </form>
    </div>
  );
}
