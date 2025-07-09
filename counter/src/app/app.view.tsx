// import React from 'react'

import { useAppStore } from "./app.context";
import { useObservable } from "../utils";

export const AppView = () => {
    const {state: {count$}, actions: {incrementByOne}} = useAppStore();
    const count = useObservable(count$);


    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <h2>Counter: {count}</h2>
          <button  onClick={incrementByOne}>➕ Increment</button>
        </div>
      );
}
