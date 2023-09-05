import { main } from "ariamis";
import { ButtonBar } from "./ButtonBar";
import { Graph } from "./Graph";
import { Header } from "./Header";
import "./Main.css";
import { Timers } from "./Timers";
import { TotalTime } from "./TotalTime";

export function Main() {
    return main([
        Header(),
        TotalTime(),
        Timers(),
        ButtonBar(),
        Graph(),
    ])
}