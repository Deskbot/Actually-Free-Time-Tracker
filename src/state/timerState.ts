import { Observable, ObservableArray, observable, observableArray } from "../observable/observable";
import { Timer, newTimerByName, timerEquals } from "../domain/Timer";

let focusedTimer: Timer | undefined = undefined;

export const timers: ObservableArray<Observable<Timer>> = observableArray([]);

export function addNewTimer(name: string) {
    const timer = newTimerByName(name)
    timers.push(observable(timer, timerEquals))
}

let counterInterval: number | undefined = undefined

export function focusTimer(timer: Timer) {
    focusedTimer

    focusedTimer = timer

    if (counterInterval !== undefined) {
        clearInterval(counterInterval)
    }

    counterInterval = window.setInterval(() => {


    }, 1000)
}
