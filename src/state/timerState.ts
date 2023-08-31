import { Observable, ObservableArray, observable, observableArray } from "../observable/observable"
import { Timer, endInterval, newTimerByName, startInterval, timerEquals } from "../domain/Timer"

export const timers: ObservableArray<Observable<Timer>> = observableArray([]);

export function addNewTimer(name: string) {
    const timer = newTimerByName(name)
    timers.push(observable(timer, timerEquals))
}

let focusedTimer: Timer | undefined = undefined

export function focusTimer(timer: Timer) {
    if (focusedTimer !== undefined) {
        endInterval(focusedTimer)
    }

    startInterval(timer)

    focusedTimer = timer
}
