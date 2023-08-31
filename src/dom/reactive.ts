import { ObservableArray } from "../observable/observable";
import { removeAllChildren } from "./utils";

export function fromObservableArray(node: Node, arr: ObservableArray<Node>): Node {
    removeAllChildren(node)

    for (const elem of arr.values) {
        node.appendChild(elem)
    }

    arr.onPush((child) => node.appendChild(child))
    arr.onRemove((child, i) => node.removeChild(child))

    return node
}
