import { Interval } from "../domain/Interval";
import { Timer, TimerStatic, endInterval, newTimerByName, startInterval, timerEquals, timerFromStatic } from "../domain/Timer";
import { Observable, ObservableArray, observable, observableArray } from "../observable/observable";

type LocalStorageTimers = TimerStatic[]

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

window.addEventListener("load", () => {
    const storedTimerJson = localStorage.getItem("timers")
    if (storedTimerJson == null) {
        return
    }

    const storedTimers: LocalStorageTimers = JSON.parse(storedTimerJson)

    for (const timer of storedTimers) {
        timers.push(timerFromStatic(timer))
    }
})
window.addEventListener("beforeunload", () => {
    localStorage.setItem("timers", timersToJson(timers))
})

function timersToJson(timers: ObservableArray<Timer>) {
    return JSON.stringify(timers.elems.map(timerToObj))
}

function timerToObj(timer: Timer): TimerStatic {
    return {
        id: timer.id,
        name: timer.name.value,
        isFocused: timer.isFocused.value,
        milliseconds: timer.milliseconds,
        intervals: timer.intervals,
    }
}
