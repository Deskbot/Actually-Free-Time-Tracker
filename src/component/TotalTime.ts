import { span } from "ariamis";
import { fromObservable } from "../dom/reactive";
import { formatTime } from "../domain/format";
import { totalMilliseconds } from "../state/timerState";

export function TotalTime() {
    return span([
        "Total",
        fromObservable(
            totalMilliseconds,
            t => span([formatTime(t)]),
        )
    ])
}