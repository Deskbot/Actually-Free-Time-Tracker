import { button } from "ariamis";
import { Timer } from "../domain/Timer";
import { focusTimer } from "../state/timerState";

export function ChangeFocusButton(timer: Timer) {
    function onClick() {
        focusTimer(timer)
    }

    return button({ type: "button" }, { click: onClick }, ["Focus"])
}
