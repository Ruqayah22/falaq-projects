import { useCreateDayStore, DayStoreContext } from "./app.context";
import {DayView} from './app.view'

export const App = () => {
    const day = useCreateDayStore();

    return (
        <DayStoreContext.Provider value={day}>
            <DayView/>
        </DayStoreContext.Provider>
    )
}