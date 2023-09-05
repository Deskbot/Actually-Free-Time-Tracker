import { option, select } from "ariamis";
import { currentThemeClass, setTheme, themes } from "../state/themeState";

export function ThemePicker() {
    function onChange(this: HTMLSelectElement) {
        setTheme(this.value)
    }

    const elem = select(
        { name: "theme" },
        { change: onChange },
        Object.entries(themes).map(([className, name]) => option({ value: className }, [name]))
    )

    currentThemeClass.onChange(newThemeClass => elem.value = newThemeClass)

    return elem
}
