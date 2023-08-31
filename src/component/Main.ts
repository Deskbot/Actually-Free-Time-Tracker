import { div, h1, main } from "ariamis";
import { AddTimerButton } from "./AddTimerButton";
import { Timers } from "./Timers";
import { TotalTime } from "./TotalTime";
import "./Main.css"
import { DeleteAllButton } from "./DeleteAllButton";

export function Main() {
    return main([
        h1(["Time tracker"]),
        TotalTime(),
        AddTimerButton(),
        Timers(),
        div([
            DeleteAllButton(),
        ])
    ])
}