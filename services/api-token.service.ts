export class ApiTokenService {
    static myInstance;
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

    setToken(newToken) {
        this.token = newToken;
    }
}
