import { Observable, ObservableArray, observable, observableArray } from "../observable/observable";
import { tripleEquals } from "../utils/function";
import { Interval, intervalDuration } from "./Interval";

let nextTimerId = 0

let focusedTimer: Timer | undefined = undefined;

export type Timer = {
    readonly id: number
    readonly name: Observable<string>
    readonly milliseconds: number
    readonly intervals: Interval[]
}

export const timers: ObservableArray<Observable<Timer>> = observableArray([]);

export function addNewTimer(name: string) {
    const timer: Timer = {
        id: nextTimerId++,
        name: observable(name, tripleEquals),
        get milliseconds() {
            return this.intervals.reduce((prev, interval) => prev + intervalDuration(interval), 0)
        },
        intervals: [],
    }

    timers.push(observable(timer, timersEqual))
}

export function focusTimer(timer: Timer) {
    focusedTimer = timer
    startCounting()
}

let counterInterval: number | undefined = undefined
function startCounting() {
    if (counterInterval !== undefined) {
        clearInterval(counterInterval)
    }

    counterInterval = window.setInterval(() => {


    }, 1000)
}

function timersEqual(timer1: Timer, timer2: Timer): boolean {
    return timer1.id === timer2.id
        && timer1.name === timer2.name
        && timer1.milliseconds === timer2.milliseconds
}
