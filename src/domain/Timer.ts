import { Observable, observable } from "../observable/observable";
import { tripleEquals } from "../utils/function";
import { Interval, sumIntervalDurations } from "./Interval";

export type Timer = {
    readonly id: number
    readonly name: Observable<string>
    readonly isFocused: Observable<boolean>
    readonly milliseconds: Observable<number>
    readonly intervals: Interval[]
}

export type TimerStatic = {
    id: number
    name: string
    isFocused: boolean
    intervals: Interval[]
}

let nextTimerId = 0

export function newTimerByName(name: string): Timer {
    const timer = new TimerImpl()
    timer.name.set(name)
    return timer
}

export function timerFromStatic(staticTimer: TimerStatic) {
    return new TimerImpl(staticTimer)
}

class TimerImpl implements Timer {
    readonly id: number
    readonly name: Observable<string>
    readonly intervals: Interval[]
    readonly isFocused: Observable<boolean>
    readonly milliseconds: Observable<number>

    private interval: number | undefined

    constructor(staticTimer?: TimerStatic) {
        if (staticTimer) {
            this.id = staticTimer.id
            this.name = observable(staticTimer.name, tripleEquals)
            this.intervals = staticTimer.intervals
            this.isFocused = observable(staticTimer.isFocused, tripleEquals)
        } else {
            this.id = nextTimerId++
            this.name = observable("", tripleEquals)
            this.isFocused = observable(false, tripleEquals)
            this.intervals = []
        }

        this.milliseconds = observable(sumIntervalDurations(this.intervals), tripleEquals)

        this.onFocusChange(this.isFocused.value)
        this.isFocused.onChange(isFocused => this.onFocusChange(isFocused))
    }

    private onFocusChange(isFocused: boolean) {
        if (isFocused) {
            this.interval = window.setInterval(() => {
                this.milliseconds.set(sumIntervalDurations(this.intervals))
            }, 500)
        } else {
            if (this.interval !== undefined) {
                this.interval = undefined
            }
        }
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
