import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useCreateAppStore, AppStoreContext } from "./app.context";
import { AppView } from "./app.view";

import "../style/index.css";

export const App = () => {
  const store = useCreateAppStore();

  return (
    <AppStoreContext.Provider value={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/:id?" element={<AppView />} />
        </Routes>
      </BrowserRouter>
    </AppStoreContext.Provider>
  );
};
