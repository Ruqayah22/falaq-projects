import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCreateAppStore, AppStoreContext } from "./app.context";
import AppView  from "./app.view";

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
