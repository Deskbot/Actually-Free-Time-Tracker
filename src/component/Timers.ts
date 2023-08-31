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

function Name(timer: Observable<string>) {
    function onChange(this: HTMLInputElement) {
        timer.set(this.value)
    }

    return input({
        type: "text",
        value: timer.value,
    }, {
        change: onChange,
    }, [])
}
