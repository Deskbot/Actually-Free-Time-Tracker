import { div, h1, main } from "ariamis";
import { AddTimerButton } from "./AddTimerButton";
import { ButtonBar } from "./ButtonBar";
import "./Main.css";
import { Timers } from "./Timers";
import { TotalTime } from "./TotalTime";

export function Main() {
    return main([
        h1(["Time tracker"]),
        TotalTime(),
        div(),
        AddTimerButton(),
        Timers(),
        div(),
        ButtonBar(),
    ])
}