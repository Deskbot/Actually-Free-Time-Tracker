import { div, input, span } from "ariamis";
import { fromObservable, fromObservableArray } from "../dom/reactive";
import { Timer } from "../domain/Timer";
import { formatTime } from "../domain/format";
import { Observable, mapObservableArray, observable } from "../observable/observable";
import { timers } from "../state/timerState";
import { tripleEquals } from "../utils/function";
import { ChangeFocusButton } from "./ChangeFocusButton";
import "./Timers.css"

export function Timers(): Node {
    return fromObservableArray(div({ className: "timers" }), mapObservableArray(timers, Timer))
}

function Timer(observableTimer: Observable<Timer>): Node {
    return fromObservable(observableTimer, timer => {
        return div({ className: "timer" }, [
            Name(timer.name),
            div({ className: "timer-time-and-button" }, [
                TimeDisplay(timer),
                ChangeFocusButton(timer),
            ]),
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

    updateTime();
    function updateTime() {
        timeString.set(formatTime(timer.milliseconds))
    }

    setInterval(updateTime, 500)

    return fromObservable(timeString, str => span([str]))
}
