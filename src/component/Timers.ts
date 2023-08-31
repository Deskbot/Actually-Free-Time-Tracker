import { div } from "ariamis";
import { fromObservable, fromObservableArray } from "../dom/reactive";
import { Observable, mapObservableArray } from "../observable/observable";
import { Timer, timers } from "../state/timer";

export function Timers(): Node {
    return fromObservableArray(div(), mapObservableArray(timers, Timer))
}

function Timer(observableTimer: Observable<Timer>): Node {
    return fromObservable(observableTimer, timer => {
        return div([
            timer.name,
            timer.milliseconds
        ])
    })
}
