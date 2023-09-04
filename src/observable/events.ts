export type Listener<T> = {
    listen(handle: Handler<T>): void
}

export type Emitter<T> = {
    emit(val: T): void
    listen(handle: Handler<T>): void
}

export type Handler<T = undefined> = (newVal: T) => void

export class Events<T = undefined> implements Emitter<T> {
    private handlers = [] as Handler<T>[]

    emit(val: T) {
        for (const handler of this.handlers) {
            handler(val)
        }
    }

    listen(handle: Handler<T>) {
        const uniqueHandler: Handler<T> = val => handle(val)
        this.handlers.push(uniqueHandler)
        return () => this.stopListening(uniqueHandler)
    }

    private stopListening(handle: Handler<T>) {
        const index = this.handlers.indexOf(handle)
        this.handlers.splice(index, 1)
    }
}
