import { button } from "ariamis";
import { removeAllTimers as removeAllTimers } from "../state/timerState";

export function DeleteAllButton() {
    function onClick() {
        if (confirm("Remove all timers?")) {
            removeAllTimers()
        }
    }

    return button({ type: "button" }, { click: onClick }, ["Remove All"])
}