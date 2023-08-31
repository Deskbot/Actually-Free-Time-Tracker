import { fragment, h1 } from "ariamis";
import { Timers } from "./Timers";
import { AddTimerButton } from "./AddTimerButton";

export function Main() {
    return fragment([
        h1(["Time tracker"]),
        Timers(),
        AddTimerButton(),
    ])
}