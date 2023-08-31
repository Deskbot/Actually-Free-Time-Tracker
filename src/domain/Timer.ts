import { Observable, ObservableArray, mapObservableArray, observable, observableArray, reduceObservableArray } from "../observable/observable";
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
    const timer = new TimerImpl()
    timer.name.set(name)
    return timer
}

class TimerImpl implements Timer {
    readonly id: number
    readonly name: Observable<string>
    readonly intervals: Interval[]

    constructor() {
        this.id = nextTimerId++
        this.name = observable("", tripleEquals)
        this.intervals = []
    }

    get milliseconds() {
        return this.intervals.reduce((prev, nextInterval) => prev + intervalDuration(nextInterval), 0)
    }
}

export function timerEquals(timer1: Timer, timer2: Timer): boolean {
    return timer1.id === timer2.id
        && timer1.name === timer2.name
        && timer1.milliseconds === timer2.milliseconds
}

export function startInterval(timer: Timer) {
    timer.intervals.push({ start: new Date().getTime(), end: undefined })
}

export function endInterval(timer: Timer) {
    const lastInterval = timer.intervals[timer.intervals.length - 1]

    if (lastInterval !== undefined) {
        lastInterval.end = new Date().getTime()
    }
}
