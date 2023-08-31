import { Observable, observable } from "../observable/observable";
import { tripleEquals } from "../utils/function";
import { Interval, intervalDuration } from "./Interval";

export type Timer = {
    readonly id: number
    readonly name: Observable<string>
    readonly milliseconds: number
    readonly intervals: Interval[]
}

let nextTimerId = 0

export function newTimerByName(name: string): Timer {
    return {
        id: nextTimerId++,
        name: observable(name, tripleEquals),
        get milliseconds() {
            return this.intervals.reduce((prev, interval) => prev + intervalDuration(interval), 0)
        },
        intervals: [],
    }
}
