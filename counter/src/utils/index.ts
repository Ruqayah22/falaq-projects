import { Observable } from "rxjs";
import { useState, useEffect } from "react";

type ObservableWrapper<T> ={
    observable: Observable<T>;
    initialValue: T;
};

export function withInitialValue<T>(
    observable: Observable<T>,
    initialValue: T
){
    return Object.freeze({observable, initialValue}); //freeze means that not change the data from any where by but the come data are updated
}

export function useObservable<T>({
    observable,
    initialValue,
}: ObservableWrapper<T>){
    const [state, setState] = useState<T>(()=> initialValue);
    
    useEffect(()=> {
        const sub = observable.subscribe(setState);
        
        return () => sub.unsubscribe();
    }, [observable]);

    return state;
} 