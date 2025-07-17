import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppStore } from "./app.context";
import { useObservable } from "../utils";
import "../style/index.css";
import * as z from "zod";

const InputsSchema = z.object({
  firstName: z.string().min(1).max(12),
  lastName: z.string().min(1).max(12),
  email: z.email(),
  password: z.string().min(8),
});

type Inputs = z.infer<typeof InputsSchema>;

export default function AppView() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(InputsSchema) });

  const {
    state: { items$ },
    actions: { addItem },
  } = useAppStore();

  const registerItems = useObservable(items$);

  // const onSubmit: SubmitHandler<Inputs> = (data) => {
  //   addItem(data.firstName);
  //   addItem(data.lastName);
  //   addItem(data.email);
  //   addItem(data.password);
  //   reset();
  //   // console.log(data);
  // };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Submission failed");

      const result = await res.json();
      console.log("Server response:", result);

      // You can update local RxJS state here too
      addItem(data.firstName);
      addItem(data.lastName);
      addItem(data.email);
      addItem(data.password);
      reset();
    } catch (err) {
      console.error("AJAX submit error:", err);
    }
  };

  console.log(registerItems);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          aria-label="firstName"
          className="inputText"
          {...register("firstName")}
          placeholder="Type something..."
        />
        <p>{errors.firstName?.message}</p>
        <input
          className="inputText"
          {...register("lastName")}
          placeholder="Type something..."
        />
        <p>{errors.lastName?.message}</p>
        <input
          className="inputText"
          {...register("email")}
          placeholder="Type something..."
        />
        <p>{errors.email?.message}</p>
        <input
          className="inputText"
          {...register("password")}
          placeholder="Type something..."
        />
        <p>{errors.password?.message}</p>

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
