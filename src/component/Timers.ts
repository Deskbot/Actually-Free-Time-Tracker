import { div, input } from "ariamis";
import { fromObservable, fromObservableArray } from "../dom/reactive";
import { Timer } from "../domain/Timer";
import { Observable, mapObservableArray } from "../observable/observable";
import { timers } from "../state/timerState";
import { ChangeFocusButton } from "./ChangeFocusButton";

export function Timers(): Node {
    return fromObservableArray(div(), mapObservableArray(timers, Timer))
}

function Timer(observableTimer: Observable<Timer>): Node {
    return fromObservable(observableTimer, timer => {
        return div([
            Name(timer.name),
            timer.milliseconds,
            ChangeFocusButton(timer),
        ])
    })
}

function Name(name: Observable<string>) {
    function onChange(this: HTMLInputElement) {
        name.set(this.value)
    }

    const elem = input({
        type: "text",
        value: name.value,
    }, {
        change: onChange,
    }, [])

    name.onChange(newName => elem.value = newName)

    return elem
}
