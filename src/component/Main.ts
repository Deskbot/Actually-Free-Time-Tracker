import { fragment, h1 } from "ariamis";
import { Timers } from "./Timers";
import { AddTimerButton } from "./AddTimerButton";
import { TotalTime } from "./TotalTime";

export function Main() {
    return fragment([
        h1(["Time tracker"]),
        TotalTime(),
        Timers(),
        AddTimerButton(),
    ])
}