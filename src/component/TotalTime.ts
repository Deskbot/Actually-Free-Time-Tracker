import { rawHtml, span } from "ariamis";
import { fromObservable } from "../dom/reactive";
import { formatTime } from "../domain/format";
import { mapObservable } from "../observable/observable";
import { totalMilliseconds } from "../state/timerState";

export function TotalTime() {
    const timeString = mapObservable(totalMilliseconds, formatTime)

    return fromObservable(
        timeString,
        t => span(["Total: ", rawHtml(t)]),
    )
}
