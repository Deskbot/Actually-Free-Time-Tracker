import { option, select } from "ariamis";
import { setTheme, themeNames } from "../state/themeState";

export function ThemePicker() {
    function onChange(this: HTMLSelectElement) {
        setTheme(this.value)
    }

    return select(
        { name: "theme" },
        { change: onChange },
        themeNames.map(theme => option([theme]))
    )
}
