import { Equality, tripleEquals } from "../utils/function"
import { Events } from "./events"

export type Observable<T> = {
    value: T
    onChange(handler: (newVal: T) => void, runNow?: boolean): () => void
    set(newVal: T): void
}

export type TupleOfObservables<T extends readonly any[]> = {
    readonly [Index in keyof T]: Observable<T[Index]>
}

export function observable<T>(initialValue: T, isEqual: Equality<T> = tripleEquals): Observable<T> {
    const events = new Events<T>()

    return {
        value: initialValue,
        onChange(handler, runNow = false) {
            const stopListening = events.listen(handler)
            if (runNow) {
                handler(this.value)
            }
            return stopListening
        },
        set(newVal) {
            if (!isEqual(newVal, this.value)) {
                this.value = newVal
                events.emit(newVal)
            }
        }
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
