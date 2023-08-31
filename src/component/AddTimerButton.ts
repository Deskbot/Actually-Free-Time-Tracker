import { button } from "ariamis";
import { addNewTimer } from "../state/timerState";

export function AddTimerButton() {
    function onClick() {
        addNewTimer("New Timer");
    }

    return button({ type: "button" }, { click: onClick }, ["Add Timer"])
}
