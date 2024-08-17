type ToNotifyFunc<T> = (options?: T) => void;

export class ComponentsStateNotify<State, FuncOptions> {
    constructor(initialState: State) {
        this._state = initialState;
    }

    toNotify: {
        cb: ToNotifyFunc<FuncOptions>;
    }[] = [];

    addNotifier(notifyFunction: ToNotifyFunc<FuncOptions>) {
        this.toNotify.push({
            cb: notifyFunction,
        });
    }

    notify(options?: FuncOptions) {
        this.toNotify.forEach((obj) => {
            obj.cb(options);
        });
    }

    private _state: State;

    get state(): State {
        return this._state;
    }

    set state(value: Partial<State>) {
        this._state = {
            ...this._state,
            ...value,
        };
        this.notify({
            state: this._state,
        } as FuncOptions);
    }
}
