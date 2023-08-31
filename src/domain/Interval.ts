
export type Interval = {
    start: number
    end: number | undefined
}

export function intervalDuration(interval: Interval) {
    return (interval.end ?? new Date().getTime()) - interval.start
}

export function sumIntervalDurations(intervals: Interval[]) {
    return intervals.reduce(
        (prev, nextInterval) => prev + intervalDuration(nextInterval), 0
    )
}
