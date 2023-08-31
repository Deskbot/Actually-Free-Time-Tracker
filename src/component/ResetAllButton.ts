import { button } from "ariamis";
import { resetAllTimers } from "../state/timerState";

export function ResetAllButton() {
    function onClick() {
        if (confirm("Reset all timers?")) {
            resetAllTimers()
        }
    }

    return button({ type: "button" }, { click: onClick }, ["Reset All"])
}