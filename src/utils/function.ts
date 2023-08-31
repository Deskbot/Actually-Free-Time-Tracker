export function tripleEquals<T>(left: T, right: T): boolean {
    return left === right
}

export type Equality<T> = (left: T, right: T) => boolean
