import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppStore } from "./app.context";
import { useObservable } from "../utils";
import "../style/index.css";
import * as z from "zod";

import { MdOutlineDelete } from "react-icons/md";
// import { CiEdit } from "react-icons/ci";
import { BiEditAlt } from "react-icons/bi";

const InputsSchema = z.object({
  title: z.string().min(1).max(20),
  description: z.string().min(20),
  price: z.coerce.number(), //z.number(),
});

// const InputsSchema: z.ZodType<{
//   title: string;
//   description: string;
//   price: number;
// }> = z.object({
//   title: z.string().min(1).max(20),
//   description: z.string().min(20),
//   price: z.coerce.number(),
// });

type Inputs = z.infer<typeof InputsSchema>;

export default function AppView() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(InputsSchema) });

  // const onSubmit = (data: Inputs) => {
  //   console.log(data);
  // };

  const {
    state: { items$ },
    // actions: { addItem },
    actions: {
  addItem,
  editItem,
  deleteItem
}
  } = useAppStore();

  const registerItems = useObservable(items$);

  
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/product", {
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
      // addItem(data.title);
      // addItem(data.description);
      // addItem(data.price.toString());
      addItem(data);
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
          aria-label="title"
          className="inputText"
          {...register("title")}
          placeholder="Type something..."
        />
        <p>{errors.title?.message}</p>
        <input
          className="inputText"
          {...register("description")}
          placeholder="Type something..."
        />
        <p>{errors.description?.message}</p>
        {/* <input
          className="inputText"
          {...register("price")}
          placeholder="Type something..."
        /> */}
        <input
          type="number"
          step="any"
          className="inputText"
          {...register("price")}
          placeholder="Price..."
        />
        <p>{errors.price?.message}</p>

        <input className="btn" type="submit" />

        {/* <ul>
          {registerItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul> */}
      </form>
      {/* display data */}
      <div className="ProductTable">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {registerItems.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td className="icons">
                  <MdOutlineDelete onClick={() => deleteItem(item.id)} />
                  {/* <CiEdit onClick={() => setEditingItem(item)} /> */}
                  <BiEditAlt onClick={() => editItem(item)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
