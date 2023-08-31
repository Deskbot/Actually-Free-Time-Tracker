import { h1, main } from "ariamis";
import { ButtonBar } from "./ButtonBar";
import "./Main.css";
import { Timers } from "./Timers";
import { TotalTime } from "./TotalTime";
import { Graph } from "./Graph";

export function Main() {
    return main([
        h1(["Time tracker"]),
        TotalTime(),
        Timers(),
        ButtonBar(),
        Graph(),
    ])
}