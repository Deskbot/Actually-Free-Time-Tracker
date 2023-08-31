
export type Interval = {
    start: number
    end: number
}

export function intervalDuration(interval: Interval) {
    return interval.end - interval.start
}
