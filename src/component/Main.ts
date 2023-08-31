import { fragment, h1 } from "ariamis";
import { Timers } from "./Timers";

export function Main() {
    return fragment([
        h1(["Time tracker"]),
        Timers(),
    ])
}