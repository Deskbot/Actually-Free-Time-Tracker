import { div } from "ariamis";
import { DeleteAllButton } from "./DeleteAllButton";
import { ResetAllButton } from "./ResetAllButton";
import "./ButtonBar.css"

export function ButtonBar() {
    return div({ className: "button-bar" }, [
        ResetAllButton(),
        DeleteAllButton(),
    ])
}