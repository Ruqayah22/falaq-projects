// import { useState } from "react";
// import { useForm, type SubmitHandler } from "react-hook-form";

// // type Inputs = {
// //   text: string;
// // };

// interface IFormInput {
//   text: string;
// }
  

// export default function App() {
// //   const {
// //     register,
// //     handleSubmit,
// //     // watch,
// //     // formState: { errors },
// //     reset,
// //   } = useForm<Inputs>(
// //     // {
// // //     defaultValues: {
// // //       text: "",
// // //     },
// // //   }
// // );
// const { register, handleSubmit, reset } = useForm<IFormInput>();

//   //   const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

//   //   console.log(watch("text")); // watch input value by passing the name of it

//   // const toDo = watch("text");

//   const [items, setItems] = useState<string[]>([]);

// //   const onSubmit: SubmitHandler<Inputs> = (data) => {
//     const onSubmit: SubmitHandler<IFormInput> = (data) => {
//       setItems((prev) => [...prev, data.text]);
//       // console.log(data.text);
//       reset();
//     };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input
//         // defaultValue="test"
//         {...register("text")}
//         placeholder="Type something..."
//       />

//       {/* <input defaultValue="test" {...(register("text"), { required: true })} /> */}
//       {/* {errors.text && <span>This field is required</span>} */}

//       <input type="submit" />

//       {/* <p>{toDo}</p> */}
//       <ul>
//         {items.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>
//     </form>
//   );
// }


import { useForm, type SubmitHandler} from "react-hook-form";

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
}

export default function App() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true, maxLength: 20 })} />
      <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
      <input type="number" {...register("age", { min: 18, max: 99 })} />
      <input type="submit" />
    </form>
  );
}