import { div, span } from "ariamis";
import { fromObservable, fromObservableArray } from "../dom/reactive";
import { Timer } from "../domain/Timer";
import { mapObservableArray } from "../observable/observable";
import { timers } from "../state/timerState";
import "./Graph.css"

export function Graph() {
    return div({ className: "graph" }, [
        fromObservableArray(
            mapObservableArray(timers, timer => Bar(timer))
        )
    ])
}

function Bar(timer: Timer) {


    return div({ className: "bar" }, [
        fromObservable(timer.name, name => span([name]))
    ])
}
