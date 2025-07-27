import { MdOutlineDelete } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

import { useAppStore } from "./app.context";
import { useObservable } from "../utils";
import "../style/index.css";
import { useEffect, useState } from "react";
import { ToDoForm } from "./toDo-form";

export default function AppView() {
  const [checkedIds, setCheckedIds] = useState<Array<string | number>>([]);
  const {
    state: { toDos$ },
    actions: { refreshToDos, deleteTodo },
  } = useAppStore();

  const toDos = useObservable(toDos$);

  useEffect(() => {
    refreshToDos();
  }, []);

  const toggleChecked = (id: string | number) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };
const activeToDos = toDos.filter((item) => !checkedIds.includes(item.id));
const completedToDos = toDos.filter((item) => checkedIds.includes(item.id));
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginTop: "50px",
      }}
    >
      {/* <ToDoForm />

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
      </ul> */}

      <ToDoForm />

      {/* Active Todos */}
      <ul>
        {activeToDos.map((item) => (
          <li key={item.id}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="checkbox"
                checked={checkedIds.includes(item.id)}
                onChange={() => toggleChecked(item.id)}
                style={{ transform: "scale(2)", marginRight: "10px" }}
              />
              <span style={{ flex: 1 }}>{item.text}</span>

              <MdOutlineDelete
                onClick={() => deleteTodo(item.id)}
                style={{ cursor: "pointer" }}
              />
              <Link to={`/${item.id}`}>
                <BiEditAlt
                  className="icon-black"
                  style={{ cursor: "pointer", color: "black" }}
                />
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {/* Completed Todos */}
      {completedToDos.length > 0 && (
        <>
          <h4>Completed</h4>
          <ul>
            {completedToDos.map((item) => (
              <li key={item.id}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    textDecoration: "line-through",
                    opacity: 0.6,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={true}
                    onChange={() => toggleChecked(item.id)}
                  />
                  <span style={{ flex: 1 }}>{item.text}</span>

                  <MdOutlineDelete
                    onClick={() => deleteTodo(item.id)}
                    style={{ cursor: "pointer" }}
                  />
                  <Link to={`/${item.id}`}>
                    <BiEditAlt
                      className="icon-black"
                      style={{ cursor: "pointer", color: "black" }}
                    />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

