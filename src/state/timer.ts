import { Observable, ObservableArray, observable, observableArray } from "../observable/observable";

let nextTimerId = 0

export type Timer = {
    id: number
    name: string
    seconds: number
}

export const timers: ObservableArray<Observable<Timer>> = observableArray([]);

export function addNewTimer(name: string) {
    const timer = {
        id: nextTimerId++,
        name,
        seconds: 0,
    }

    timers.push(observable(timer, timersEqual))
}

function timersEqual(timer1: Timer, timer2: Timer): boolean {
    return timer1.id === timer2.id
}
