import { observable } from "../observable/observable"

export const themes = {
    "theme-classic": "Classic",
    "theme-goth": "Goth",
    "theme-toilet-bowl": "Toilet Bowl",
    "theme-british-sky": "British Sky",
}

export const currentThemeClass = observable("")

export function setTheme(className: string) {
    localStorage.setItem("theme", className)

    for (const className of Object.keys(themes)) {
        document.body.classList.remove(className)
    }

    document.body.classList.add(className)

    currentThemeClass.set(className)
}

window.addEventListener("load", () => {
    const className = localStorage.getItem("theme")
    if (className) {
        setTheme(className)
    }
})
