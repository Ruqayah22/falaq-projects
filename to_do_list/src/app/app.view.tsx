import { MdOutlineDelete } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

import { useAppStore } from "./app.context";
import { useObservable } from "../utils";
import "../style/index.css";
import { useEffect } from "react";
import { ToDoForm } from "./toDo-form";

export default function AppView() {
  const {
    state: { toDos$ },
    actions: { refreshToDos, deleteTodo },
  } = useAppStore();

  const toDos = useObservable(toDos$);

  useEffect(() => {
    refreshToDos();
  }, []);

  return (
    // <div>
    //   <ToDoForm/>
    //   <div>
    //     <ul>
    //       {toDos.map((item, index) => (
    //         <>
    //         <li key={index}>{item.text}</li>
    //         <MdOutlineDelete
    //           onClick={() => deleteTodo(item.id)}
    //           style={{ cursor: "pointer" }}
    //         />

    //         <Link to={`/${item.id}`}>
    //           <BiEditAlt className="icon-black" />
    //         </Link>
    //         </>
    //       ))}
    //     </ul>
    //   </div>
    // </div>
    // <div>
    //   <ToDoForm />
    //   <div>
    //     <ul style={{ listStyle: "none", padding: 0 }}>
    //       {toDos.map((item, index) => (
    //         <li key={index} style={{ marginBottom: "10px" }}>
    //           <div
    //             style={{ display: "flex", alignItems: "center", gap: "10px" }}
    //           >
    //             <span style={{ flex: 1 }}>{item.text}</span>

    //             <MdOutlineDelete
    //               onClick={() => deleteTodo(item.id)}
    //               style={{ cursor: "pointer" }}
    //             />

    //             <Link to={`/${item.id}`}>
    //               <BiEditAlt
    //                 className="icon-black"
    //                 style={{ cursor: "pointer" }}
    //               />
    //             </Link>
    //           </div>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>
    <div
     style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginTop: "50px"
  
      }}
    >
      <ToDoForm />

      <ul>
        {toDos.map((item, index) => (
          <li key={index}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ flex: 1 }}>{item.text}</span>

              <MdOutlineDelete
                onClick={() => deleteTodo(item.id)}
                style={{ cursor: "pointer", marginTop: "15px" }}
              />

              <Link to={`/${item.id}`}>
                <BiEditAlt
                  className="icon-black"
                  style={{ cursor: "pointer", marginTop: "20px", color: "black" }}
                />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
