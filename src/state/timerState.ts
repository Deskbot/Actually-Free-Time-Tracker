import { Timer, endInterval, newTimerByName, startInterval, timerEquals } from "../domain/Timer";
import { Observable, ObservableArray, observable, observableArray } from "../observable/observable";

export const timers: ObservableArray<Timer> = observableArray([]);
// export const totalMilliseconds = reduceObservableArray(
//     timers,
//     0,
//     (oldResult, newTimer) => oldResult + newTimer.value.milliseconds,
//     (oldResult, oldTimer) => oldResult - oldTimer.value.milliseconds,
//     tripleEquals,
// )

export function addNewTimer(name: string) {
    const timer = newTimerByName(name)
    timers.push(timer)
}

let focusedTimer: Timer | undefined = undefined

export function focusTimer(timer: Timer) {
    if (focusedTimer !== undefined) {
        focusedTimer.isFocused.set(false)
        endInterval(focusedTimer)
    }

    startInterval(timer)

    focusedTimer = timer
    focusedTimer.isFocused.set(true)
}
