import { Equality, tripleEquals } from "../utils/function"
import { Events } from "./events"
import { Observable, TupleOfObservables, observable } from "./observable"

export type ObservableArray<T> = {
    elems: T[]
    push(val: T): void
    replace(i: number, val: T): void
    remove(i: number): void
    onPush(handler: (newVal: T) => void): () => void
    onRemove(handler: (oldValue: T, i: number) => void): () => void
    onReplace(handler: (oldValue: T, i: number, newValue: T) => void): () => void
}

export function mapObservableArray<T, U>(arr: ObservableArray<T>, mapper: (val: T) => U): ObservableArray<U> {
    const resultArr = observableArray(arr.elems.map(mapper))

    arr.onPush(val => resultArr.push(mapper(val)))
    arr.onRemove((val, i) => resultArr.remove(i))
    arr.onReplace((oldVal, i, newVal) => resultArr.replace(i, mapper(newVal)))

    return resultArr
}

export function observableArray<T>(arr: T[]): ObservableArray<T> {
    const pushEvents = new Events<T>()
    const removeEvents = new Events<[T, number]>()
    const replaceEvents = new Events<[T, number, T]>()

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
            } else {
                console.warn("Failed to remove element", i, "doesn't exist in array.")
            }
        },
        replace(i, val) {
            if (i < this.elems.length) {
                const old = this.elems[i]
                this.elems[i] = val
                replaceEvents.emit([old, i, val])
            } else {
                console.warn("Failed to replace element", i, "doesn't exist in array.")
            }
        },
        onPush(handler) {
            const stopListening = pushEvents.listen(handler)
            return stopListening
        },
        onRemove(handler) {
            const stopListening = removeEvents.listen(args => handler(...args))
            return stopListening
        },
        onReplace(handler) {
            const stopListening = replaceEvents.listen(args => handler(...args))
            return stopListening
        }
    }
}

export function reduceObservableArray<T, U>(
    arr: ObservableArray<T>,
    initial: U,
    onPush: (oldResult: U, val: T) => U,
    onRemove: (oldResult: U, val: T, i: number) => U,
    onReplace: (oldResult: U, oldVal: T, i: number, newVal: T) => U,
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
    arr.onReplace((oldElem, i, newElem) => {
        const newResult = onReplace(result.value, oldElem, i, newElem)
        result.set(newResult)
    })

    return result
}

export function joinObservables<
    const T extends TupleOfObservables<any>,
    A extends { [Index in keyof T]: T[Index] extends Observable<infer E> ? E : never },
    U
>(
    observables: T,
    joiner: (...sources: A) => U,
    runNow: boolean = false
): Observable<U> {
    function getResult() {
        return joiner(...observables.map(obs => obs.value) as unknown as A)
    }

    const result = observable(getResult(), tripleEquals)

    function update() {
        return result.set(getResult())
    }

    for (const obs of observables) {
        obs.onChange(update, runNow)
    }

    return result
}

export function implodeObservables<T>(arr: ObservableArray<Observable<T>>): ObservableArray<T> {
    const result = observableArray<T>(arr.elems.map(obs => obs.value))

    const observableClosers = new Map<Observable<T>, () => void>()

    function startListening(obs: Observable<T>) {
        const close = obs.onChange((val) => {
            const i = arr.elems.indexOf(obs)
            if (i < arr.elems.length) {
                result.replace(i, val)
            } else {
                console.error("Expected element", i, "to exist in array.")
            }
        })
        observableClosers.set(obs, close)
    }

    function stopListening(obs: Observable<T>) {
        const close = observableClosers.get(obs)
        if (close) {
            close()
        }
    }

    arr.onPush((obs) => {
        result.push(obs.value)
        startListening(obs)
    })
    arr.onRemove((obs, i) => {
        result.remove(i)
        stopListening(obs)
    })
    arr.onReplace((oldObs, i, newObs) => {
        result.replace(i, newObs.value)
        stopListening(oldObs)
        startListening(newObs)
    })

    return result
}
