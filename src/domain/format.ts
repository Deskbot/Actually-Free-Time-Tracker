
export function formatTime(milliseconds: number) {
    const seconds = Math.floor(milliseconds / 1000)
    if (seconds < 60) {
        return align(formatNum(seconds) + "s")
    }

    const minutes = Math.floor(seconds / 60)
    const andSeconds = seconds % 60

    const minutesStr = formatNum(minutes) + "m"
    if (minutes < 10) {
        return align(minutesStr + " " + formatNum(andSeconds) + "s")
    }
    if (minutes < 60) {
        return align(minutesStr)
    }

    const hours = Math.floor(minutes / 60)
    const andMinutes = minutes % 60
    return align(formatNum(hours) + "h " + formatNum(andMinutes) + "m " + formatNum(andSeconds) + "s")
}

function align(str: string) {
    return str.padStart(10)
}

function formatNum(n: number): string {
    if (n.toString().length === 1) {
        return "&nbsp;" + n
    }

    return n.toString()
}
