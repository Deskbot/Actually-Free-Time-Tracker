import { Equality, tripleEquals } from "../utils/function"
import { Events } from "./events"

export type ObservableArray<T> = {
    elems: T[]
    push(val: T): void
    remove(i: number): void
    onPush(handler: (newVal: T) => void): void
    onRemove(handler: (oldValue: T, i: number) => void): void
}

export type Observable<T> = {
    value: T
    onChange(handler: (newVal: T) => void): void
    set(newVal: T): void
}

export function observable<T>(initialValue: T, isEqual: Equality<T> = tripleEquals): Observable<T> {
    const events = new Events<T>()

    return {
        value: initialValue,
        onChange(handler) {
            events.listen(handler)
        },
        set(newVal) {
            if (!isEqual(newVal, this.value)) {
                this.value = newVal
                events.emit(newVal)
            }
        }
    }
}

export function observableArray<T>(arr: T[]): ObservableArray<T> {
    const pushEvents = new Events<T>()
    const removeEvents = new Events<[T,number]>()

    return {
        elems: arr,
        push(val) {
            this.elems.push(val)
            pushEvents.emit(val)
        },
        remove(i) {
            if (i < this.elems.length) {
                const val = this.elems.splice(i, 1)
                removeEvents.emit([val[0], i])
            }
        },
        onPush(handler) {
            pushEvents.listen(handler)
        },
        onRemove(handler) {
            removeEvents.listen(([val, i]) => handler(val, i))
        },
    }
}

export function mapObservable<T, U>(
    obs: Observable<T>,
    mapper: (val: T) => U,
    equals: Equality<U> = tripleEquals
): Observable<U> {
    const result = observable(mapper(obs.value), equals)

    obs.onChange(newVal => result.set(mapper(newVal)))

    return result
}

export function mapObservableArray<T, U>(arr: ObservableArray<T>, mapper: (val: T) => U): ObservableArray<U> {
    const resultArr = observableArray(arr.elems.map(mapper))

    arr.onPush(val => resultArr.push(mapper(val)))
    arr.onRemove((val, i) => resultArr.remove(i))

    return resultArr
}

export function reduceObservableArray<T, U>(
    arr: ObservableArray<T>,
    initial: U,
    onPush: (oldResult: U, val: T) => U,
    onRemove: (oldResult: U, val: T, i: number) => U,
    equals: Equality<U> = tripleEquals,
): Observable<U> {
    let result = observable(initial, equals)

    for (const elem of arr.elems) {
        const newResult = onPush(result.value, elem)
        result.set(newResult)
    }

    arr.onPush(elem => {
        const newResult = onPush(result.value, elem)
        result.set(newResult)
    })
    arr.onRemove((elem, i) => {
        const newResult = onRemove(result.value, elem, i)
        result.set(newResult)
    })

    return result
}
