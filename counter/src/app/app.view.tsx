// import React from 'react'

import { useAppStore } from "./app.context";
import { useObservable } from "../utils";

export const AppView = () => {
    const {state: {count$}, actions: {incrementByOne,decrementByOne}} = useAppStore();
    const count = useObservable(count$);
    

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <h2>Counter: {count}</h2>
          <button aria-label="increment-button"  onClick={incrementByOne}>➕ Increment</button> 
          <button aria-label="decrement-button" onClick={decrementByOne}>－ Decrement</button>
        </div>
      );
}
