import { div, input, span, tr } from "ariamis";
import { fromObservable, fromObservableArray } from "../dom/reactive";
import { Timer } from "../domain/Timer";
import { Observable, mapObservableArray, observable } from "../observable/observable";
import { timers } from "../state/timerState";
import { ChangeFocusButton } from "./ChangeFocusButton";
import { tripleEquals } from "../utils/function";

export function Timers(): Node {
    return fromObservableArray(div(), mapObservableArray(timers, Timer))
}

function Timer(observableTimer: Observable<Timer>): Node {
    return fromObservable(observableTimer, timer => {
        return div([
            Name(timer.name),
            TimeDisplay(timer),
            ChangeFocusButton(timer),
        ])
    })
}

function Name(name: Observable<string>) {
    function onInput(this: HTMLInputElement) {
        name.set(this.value)
    }

    const elem = input({
        type: "text",
        value: name.value,
    }, {
        input: onInput,
    }, [])

    name.onChange(newName => {
        elem.value = newName
    })

    return elem
}

function TimeDisplay(timer: Timer) {
    const timeString = observable("", tripleEquals)

    setInterval(() => {
        timeString.set(makeTimeString(timer.milliseconds))
    }, 500)

    return fromObservable(timeString, str => span([str]))
}

function makeTimeString(milliseconds: number) {
    const seconds = Math.floor(milliseconds / 1000)
    if (seconds < 60) {
        return seconds.toString().padStart(2) + " seconds"
    }

    const minutes = Math.floor(seconds / 60)
    const minutesStr = minutes.toString().padStart(2) + " minutes"

    if (minutes < 10) {
        const andSeconds = seconds % 60
        return minutesStr + " " + andSeconds.toString().padStart(2) + " seconds"
    }
    if (minutes < 60) {
        return minutesStr
    }

    const hours = Math.floor(minutes / 60)
    const andMinutes = minutes % 60
    return hours.toString().padStart(2) + " hours " + andMinutes.toString().padStart(2) + " minutes"
}
