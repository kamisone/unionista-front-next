export class ApiTokenService {
    static myInstance: ApiTokenService;
    token = null;

    static getInstance() {
        if (!ApiTokenService.myInstance) {
            ApiTokenService.myInstance = new ApiTokenService();
        }
        return this.myInstance;
    }

    getToken() {
        return this.token;
    }

    setToken() {
        // this.token = newToken;
    }
}
