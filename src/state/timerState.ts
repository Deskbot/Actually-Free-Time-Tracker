import { Timer, TimerStatic, endInterval, newTimerByName, startInterval, timerFromStatic } from "../domain/Timer";
import { Observable, ObservableArray, mapObservable, mapObservableArray, observableArray, reduceObservableArray } from "../observable/observable";

type LocalStorageTimers = TimerStatic[]

export const timers: ObservableArray<Timer> = observableArray([])
const allMillisecondsToObserve = reduceObservableArray(
    timers,
    observableArray<number>([]),
    (arr, timerObs) => {
        arr.push(timerObs.milliseconds)
        return arr
    },
    (arr, timerObs, i) => {
        arr.splice(i, 1)
        return arr
    }
)
export const totalMilliseconds = mapObservable(allMillisecondsToObserve, allTimers => {
    return reduceObservableArray(
        allTimers,
        0,
        (oldResult, newMs) => oldResult + newMs,
        (oldResult, oldMs) => oldResult - oldMs,
    )
})

export const highestTimerMilliseconds = reduceObservableArray(
    allMillisecondsToObserve,
    0,
    (oldResult, newTimer) => oldResult >= newTimer.value ? oldResult : newTimer.value,
    () => timers.elems.reduce((a,b) => Math.min(a, b.milliseconds.value), 0),
)

export function addNewTimer(name: string) {
    const timer = newTimerByName(name)
    timers.push(timer)
}

export function resetAllTimers() {
    unfocusTimer()
    for (const elem of timers.elems) {
        elem.intervals.splice(0)
    }
}

export function removeAllTimers() {
    while (timers.elems.length > 0) {
        timers.remove(0)
    }
}

let focusedTimer: Timer | undefined = undefined

export function focusTimer(timer: Timer) {
    unfocusTimer()

    startInterval(timer)

    focusedTimer = timer
    focusedTimer.isFocused.set(true)
}

function unfocusTimer() {
    if (focusedTimer !== undefined) {
        focusedTimer.isFocused.set(false)
        endInterval(focusedTimer)
        focusedTimer = undefined
    }
}

window.addEventListener("load", () => {
    const storedTimerJson = localStorage.getItem("timers")
    if (storedTimerJson == null) {
        return
    }

    const storedTimers: LocalStorageTimers = JSON.parse(storedTimerJson)

    for (const staticTimer of storedTimers) {
        const timer = timerFromStatic(staticTimer)
        timers.push(timer)
        if (timer.isFocused.value) {
            focusTimer(timer)
        }
    }
})

window.addEventListener("beforeunload", () => {
    unfocusTimer()
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
        intervals: timer.intervals,
    }
}
