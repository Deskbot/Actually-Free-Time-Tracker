import { button } from "ariamis";
import { Timer } from "../state/timer";

export function ChangeFocusButton(timer: Timer) {
    function onClick() {

    }

    return button({ type: "button" }, { click: onClick }, ["Focus"])
}
