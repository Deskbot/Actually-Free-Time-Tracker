import { Timer, TimerStatic, endInterval, newTimerByName, startInterval, timerFromStatic } from "../domain/Timer";
import { ObservableArray, implodeObservables, mapObservableArray, observableArray, reduceObservableArray } from "../observable/observable";

type LocalStorageTimers = TimerStatic[]

export const timers: ObservableArray<Timer> = observableArray([])

const allMillisecondsToObserve = implodeObservables(mapObservableArray(timers, timer => timer.milliseconds))

export const totalMilliseconds = reduceObservableArray(
    allMillisecondsToObserve,
    0,
    (oldResult, newMs) => oldResult + newMs,
    (oldResult, oldMs) => oldResult - oldMs,
    (oldResult, oldVal, i, newVal) => oldResult - oldVal + newVal,
)

const computeHighest = () => Math.min(...timers.elems.map(timer => timer.milliseconds.value))
export const highestTimerMilliseconds = reduceObservableArray(
    allMillisecondsToObserve,
    0,
    (oldResult, newMs) => oldResult >= newMs ? oldResult : newMs,
    computeHighest,
    computeHighest,
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
