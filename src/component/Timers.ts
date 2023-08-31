import { div } from "ariamis";
import { fromObservableArray } from "../dom/reactive";
import { timers } from "../state/timer";

export function Timers() {
    return fromObservableArray(div(), timers)
}