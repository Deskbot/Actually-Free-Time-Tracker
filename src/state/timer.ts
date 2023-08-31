import { Observable, ObservableArray, observable, observableArray } from "../observable/observable";
import { Timer, newTimerByName } from "../domain/Timer";

let focusedTimer: Timer | undefined = undefined;

export const timers: ObservableArray<Observable<Timer>> = observableArray([]);

export function addNewTimer(name: string) {
    const timer = newTimerByName(name)
    timers.push(observable(timer, timersEqual))
}

export function focusTimer(timer: Timer) {
    focusedTimer = timer
    startCounting()
}

let counterInterval: number | undefined = undefined
function startCounting() {
    if (counterInterval !== undefined) {
        clearInterval(counterInterval)
    }

    counterInterval = window.setInterval(() => {


    }, 1000)
}

function timersEqual(timer1: Timer, timer2: Timer): boolean {
    return timer1.id === timer2.id
        && timer1.name === timer2.name
        && timer1.milliseconds === timer2.milliseconds
}
