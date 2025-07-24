import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useCreateAppStore, AppStoreContext } from "./app.context";
import { AppView } from "./app.view";
import { ProductEditor } from "./product-editor";

import "../style/index.css";

export const App = () => {
  const store = useCreateAppStore();
  return (
    <AppStoreContext.Provider value={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppView />} />
          <Route path="/edit" element={<ProductEditor />} />
        </Routes>
      </BrowserRouter>
    </AppStoreContext.Provider>
  );
};
