
export type Interval = {
    start: number
    end: number | undefined
}

export function intervalDuration(interval: Interval) {
    return (interval.end ?? new Date().getTime()) - interval.start
}
