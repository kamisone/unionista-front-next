export class StreamService {
    private static _instance: StreamService;
    constructor() {}

    static get instance() {
        if (!this._instance) {
            this._instance = new StreamService();
        }
        return this._instance;
    }
}
