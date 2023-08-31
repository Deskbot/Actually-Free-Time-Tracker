import { Events } from "./events"

export type ObservableArray<T> = {
    values: T[]
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

export function observable<T>(initialValue: T, isChanged: (t1: T, t2: T) => boolean): Observable<T> {
    const events = new Events<T>()

    return {
        value: initialValue,
        onChange(handler) {
            events.listen(handler)
        },
        set(newVal) {
            if (isChanged(newVal, this.value)) {
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
        values: arr,
        push(val) {
            this.values.push(val)
            pushEvents.emit(val)
        },
        remove(i) {
            if (i < this.values.length) {
                const val = this.values.splice(i, 0)
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

export function mapObservableArray<T, U>(arr: ObservableArray<T>, mapper: (val: T) => U): ObservableArray<U> {
    const resultArr = observableArray(arr.values.map(mapper))

    arr.onPush(val => resultArr.push(mapper(val)))
    arr.onRemove((val, i) => resultArr.remove(i))

    return resultArr
}
