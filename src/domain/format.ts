
export function formatTime(milliseconds: number) {
    const seconds = Math.floor(milliseconds / 1000)
    if (seconds < 60) {
        return formatNum(seconds) + " seconds"
    }

    const minutes = Math.floor(seconds / 60)
    const minutesStr = formatNum(minutes) + " minutes"

    if (minutes < 10) {
        const andSeconds = seconds % 60
        return minutesStr + " " + formatNum(andSeconds) + " seconds"
    }
    if (minutes < 60) {
        return minutesStr
    }

    const hours = Math.floor(minutes / 60)
    const andMinutes = minutes % 60
    return formatNum(hours) + " hours " + formatNum(andMinutes) + " minutes"
}

function formatNum(n: number): string {
    if (n.toString().length === 1) {
        return "&nbsp;" + n
    }

    return n.toString()
}
