import { Observable, ObservableArray } from "../observable/observable";
import { contents } from "./contents";
import { removeAllChildren } from "./utils";

export function fromObservable<T>(observable: Observable<T>, mapper: (val: T) => Node): Node {
    const elem = contents()

    elem.appendChild(mapper(observable.value))

    observable.onChange((val) => elem.replaceChildren(mapper(val)))

    return elem
}

export function fromObservableArray(node: Node, arr: ObservableArray<Node>): Node {
    removeAllChildren(node)

    for (const elem of arr.values) {
        node.appendChild(elem)
    }

    arr.onPush((child) => node.appendChild(child))
    arr.onRemove((child, i) => node.removeChild(child))

    return node
}
