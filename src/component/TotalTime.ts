import { rawHtml, span } from "ariamis";
import { fromObservable } from "../dom/reactive";
import { formatTime } from "../domain/format";
import { timers } from "../state/timerState";
import { observable } from "../observable/observable";
import { tripleEquals } from "../utils/function";

export function TotalTime() {
    const timeString = observable("", tripleEquals)

    updateTime();
    function updateTime() {
        timeString.set(formatTime(timers.elems.reduce((tot,next) => tot + next.milliseconds.value, 0)))
    }

    setInterval(updateTime, 500)

    return fromObservable(
        timeString,
        t => span(["Total: ", rawHtml(t)]),
    )
}
