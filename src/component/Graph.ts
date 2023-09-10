import { div } from "ariamis";
import { flexGrow } from "../dom/flex";
import { fromObservable, fromObservableArray } from "../dom/reactive";
import { Timer } from "../domain/Timer";
import { joinObservables, mapObservableArray } from "../observable/observable";
import { highestTimerMilliseconds, timers, totalMilliseconds } from "../state/timerState";
import "./Graph.css";

export function Graph() {
    return div({ className: "graph" }, [
        fromObservableArray(
            mapObservableArray(timers, timer => Bar(timer))
        )
    ])
}

function Bar(timer: Timer) {
    const percentOfHighest = joinObservables(
        [timer.milliseconds, highestTimerMilliseconds],
        (mine, highest) => {
            if (highest === 0) {
                return 1
            } else {
                return mine / highest
            }
        }
    )

    const percentOfTotal = joinObservables(
        [timer.milliseconds, totalMilliseconds],
        (mine, total) => {
            if (total === 0) {
                return 1
            } else {
                return mine / total
            }
        }
    )

    const elem = div({ className: "bar" }, [
        fromObservable(percentOfTotal, p => div({ className: "percentage" }, [p.toFixed(0) + "%"])),
        flexGrow(),
        fromObservable(timer.name, name => div({ className: "name", title: name }, [name])),
    ])

    percentOfHighest.onChange(p => elem.style.height = (p * 100) + "%", true)

    return elem
}
