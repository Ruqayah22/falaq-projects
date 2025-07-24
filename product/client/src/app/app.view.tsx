import { MdOutlineDelete } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

import { useObservable } from "../utils";
import { useAppStore } from "./app.context";
import { useEffect } from "react";
import { ProductEditor } from "./product-editor";

export const AppView = () => {
  const {
    state: { products$ },
    actions: { refreshProducts, deleteProduct },
  } = useAppStore();

  const products = useObservable(products$);

  useEffect(() => {
    refreshProducts();
  }, []);

  return (
    <div>
      <ProductEditor />
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
            {products.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td className="icons">
                  <MdOutlineDelete
                    onClick={() => deleteProduct(item.id)}
                    style={{ cursor: "pointer" }}
                  />

                  <Link to={`/${item.id}`}>
                    <BiEditAlt className="icon-black" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
