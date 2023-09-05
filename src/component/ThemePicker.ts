import { option, select } from "ariamis";
import { setTheme, themes } from "../state/themeState";

export function ThemePicker() {
    function onChange(this: HTMLSelectElement) {
        setTheme(this.value)
    }

    return select(
        { name: "theme" },
        { change: onChange },
        Object.entries(themes).map(([className, name]) => option({ value: className }, [name]))
    )
}
