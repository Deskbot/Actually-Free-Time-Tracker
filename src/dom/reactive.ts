import { Observable, ObservableArray } from "../observable/observable";
import { contents } from "./contents";

export function fromObservable<T>(observable: Observable<T>, mapper: (val: T) => Node): Node {
    const elem = contents()

    elem.appendChild(mapper(observable.value))

    observable.onChange((val) => elem.replaceChildren(mapper(val)))

    return elem
}

export function fromObservableArray(arr: ObservableArray<Node>): Node {
    const node = contents()

    for (const elem of arr.elems) {
        node.appendChild(elem)
    }

    arr.onPush((child) => node.appendChild(child))
    arr.onRemove((child, i) => node.removeChild(child))
    arr.onReplace((oldChild, i, newChild) => node.replaceChild(oldChild, newChild))

    return node
}
