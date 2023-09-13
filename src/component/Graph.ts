import { div } from "ariamis"
import { flexGrow } from "../dom/flex"
import { fromObservable, fromObservableArray } from "../dom/reactive"
import { Timer } from "../domain/Timer"
import { joinObservables, mapObservableArray } from "../observable/observableArray"
import { highestTimerMilliseconds, timers, totalMilliseconds } from "../state/timerState"
import "./Graph.css"
import { mapObservable } from "../observable/observable"

export function Graph() {
    return div({ className: "graph" }, [
        fromObservableArray(
            mapObservableArray(timers, Bar)
        )
    ])
}

function Bar(timer: Timer) {
    const percentOfHighest = joinObservables(
        [timer.milliseconds, highestTimerMilliseconds],
        (mine, highest) => {
            if (highest === 0) {
                return 0
            } else {
                return 100 * mine / highest
            }
        }
    )

    const percentOfTotal = joinObservables(
        [timer.milliseconds, totalMilliseconds],
        (mine, total) => {
            if (total === 0) {
                return 0
            } else {
                return 100 * mine / total
            }
        }
    )

    const readablePercentOfTotal = mapObservable(percentOfTotal, p => p.toFixed(0) + "%")

    const elem = div({ className: "bar" }, [
        fromObservable(readablePercentOfTotal, p => div({ className: "percentage" }, [p])),
        fromObservable(timer.name, name => div({ className: "name" }, [name])),
    ])

    percentOfHighest.onChange(p => elem.style.height = p + "%", true)
    joinObservables([readablePercentOfTotal, timer.name], (p, n) => elem.title = `${n} ${p}`)

    return elem
}
