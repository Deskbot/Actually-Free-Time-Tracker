import { Observable, ObservableArray, observable, observableArray } from "../observable/observable";

let nextTimerId = 0

export type Timer = {
    id: number
    name: string
    milliseconds: number
}

export const timers: ObservableArray<Observable<Timer>> = observableArray([]);

export function addNewTimer(name: string) {
    const timer: Timer = {
        id: nextTimerId++,
        name,
        milliseconds: 0,
    }

    timers.push(observable(timer, timersEqual))
}

function timersEqual(timer1: Timer, timer2: Timer): boolean {
    return timer1.id === timer2.id
        && timer1.name === timer2.name
        && timer1.milliseconds === timer2.milliseconds
}

addNewTimer("poop")
addNewTimer("peep")
