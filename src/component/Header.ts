import { h1, header, span } from "ariamis"
import "./Header.css"
import { ThemePicker } from "./ThemePicker"

export function Header() {
    return header([
        h1(["Time tracker"]),
        span([
            "Theme: ",
            ThemePicker()
        ])
    ])
}