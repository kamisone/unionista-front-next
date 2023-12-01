export class StreamService {
    static myInstance: StreamService;
    constructor() {}

    static getInstance() {
        if (!StreamService.myInstance) {
            StreamService.myInstance = new StreamService();
        }

        return this.myInstance;
    }
}
