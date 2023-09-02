import { div, span } from "ariamis";
import { fromObservable, fromObservableArray } from "../dom/reactive";
import { Timer } from "../domain/Timer";
import { joinObservables, mapObservableArray } from "../observable/observable";
import { highestTimerMilliseconds, timers } from "../state/timerState";
import "./Graph.css";

export function Graph() {
    return div({ className: "graph" }, [
        fromObservableArray(
            mapObservableArray(timers, timer => Bar(timer))
        )
    ])
}

function Bar(timer: Timer) {
    const percent = joinObservables(
        [timer.milliseconds, highestTimerMilliseconds],
        (mine, highest) => {
            if (highest === 0) {
                return 1
            } else {
                return mine / highest
            }
        }
    )

    const elem = div({ className: "bar" }, [
        fromObservable(timer.name, name => span({ title: name }, [name])),
        fromObservable(percent, p => span([p + "%"]))
    ])

    percent.onChange(p => elem.style.height = (p * 100) + "%", true)

    return elem
}
