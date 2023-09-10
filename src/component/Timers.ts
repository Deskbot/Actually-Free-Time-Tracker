import { div, input, rawHtml, span } from "ariamis"
import { fromObservable, fromObservableArray } from "../dom/reactive"
import { Timer } from "../domain/Timer"
import { formatTime } from "../domain/format"
import { Observable, mapObservable } from "../observable/observable"
import { mapObservableArray } from "../observable/observableArray"
import { timers } from "../state/timerState"
import { tripleEquals } from "../utils/function"
import { AddTimerButton } from "./AddTimerButton"
import { ChangeFocusButton } from "./ChangeFocusButton"
import "./Timers.css"

export function Timers(): Node {
    return div({ className: "timers" }, [
        AddTimerButton(),
        fromObservableArray(mapObservableArray(timers, Timer))
    ])
}

function Timer(timer: Timer): Node {
    const elem = div({ className: "timer" }, [
        Name(timer.name),
        TimeDisplay(timer),
        ChangeFocusButton(timer),
    ])

    timer.isFocused.onChange(isFocused => elem.classList.toggle("focus", isFocused))

    return elem
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
    const timeString = mapObservable(timer.milliseconds, formatTime, tripleEquals)

    return fromObservable(timeString, str => span({ className: "time" }, [rawHtml(str)]))
}
