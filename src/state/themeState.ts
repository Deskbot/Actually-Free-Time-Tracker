import { observable } from "../observable/observable"
import { keyTheme } from "./localStorage"

export const themes = {
    "theme-classic": "Classic",
    "theme-goth": "Goth",
    "theme-toilet-bowl": "Toilet Bowl",
    "theme-british-sky": "British Sky",
}

export const currentThemeClass = observable("")

export function setTheme(className: string) {
    localStorage.setItem(keyTheme, className)

    for (const className of Object.keys(themes)) {
        document.body.classList.remove(className)
    }

    document.body.classList.add(className)

    currentThemeClass.set(className)
}

window.addEventListener("load", () => {
    const className = localStorage.getItem(keyTheme)
    if (className) {
        setTheme(className)
    }
})
