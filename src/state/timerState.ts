import { Observable, ObservableArray, observable, observableArray, reduceObservableArray } from "../observable/observable"
import { Timer, endInterval, newTimerByName, startInterval, timerEquals } from "../domain/Timer"
import { tripleEquals } from "../utils/function";

export const timers: ObservableArray<Observable<Timer>> = observableArray([]);
// export const totalMilliseconds = reduceObservableArray(
//     timers,
//     0,
//     (oldResult, newTimer) => oldResult + newTimer.value.milliseconds,
//     (oldResult, oldTimer) => oldResult - oldTimer.value.milliseconds,
//     tripleEquals,
// )

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
