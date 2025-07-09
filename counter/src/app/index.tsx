import {useCreateAppStore, AppStoreContext} from "./app.context"
import { AppView } from './app.view';
 

export const App = () => {
    const store = useCreateAppStore();
  return (
   <AppStoreContext.Provider value={store}>
    <AppView/>
   </AppStoreContext.Provider>
  )
}

