
export function formatTime(milliseconds: number) {
    const seconds = Math.floor(milliseconds / 1000)
    if (seconds < 60) {
        return seconds.toString().padStart(2) + " seconds"
    }

    const minutes = Math.floor(seconds / 60)
    const minutesStr = minutes.toString().padStart(2) + " minutes"

    if (minutes < 10) {
        const andSeconds = seconds % 60
        return minutesStr + " " + andSeconds.toString().padStart(2) + " seconds"
    }
    if (minutes < 60) {
        return minutesStr
    }

    const hours = Math.floor(minutes / 60)
    const andMinutes = minutes % 60
    return hours.toString().padStart(2) + " hours " + andMinutes.toString().padStart(2) + " minutes"
}
