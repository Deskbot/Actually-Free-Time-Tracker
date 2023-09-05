export const themeNames: ReadonlyArray<string> = [
    "Sky",
    "Goth",
    "Toilet Bowl",
    "British Sky",
]

export function setTheme(themeName: string) {
    localStorage.setItem("theme", themeName)

    for (const name of themeNames) {
        document.body.classList.remove(name)
    }

    document.body.classList.add(themeName)
}
