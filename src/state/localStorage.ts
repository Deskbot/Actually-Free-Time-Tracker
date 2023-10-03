// ensure that if this is on a domain shared with other apps, you won't get conflicts between apps
function makeKey(name: string): string {
    return name + " - " + window.location.pathname
}

export const keyTheme = makeKey("theme")

export const keyTimers = makeKey("timers")
