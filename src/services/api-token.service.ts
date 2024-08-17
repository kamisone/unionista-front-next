export class ApiTokenService {
    static _instance: ApiTokenService;
    token = null;

    static get instance() {
        if (!this._instance) {
            this._instance = new ApiTokenService();
        }
        return this._instance;
    }

    getToken() {
        return this.token;
    }

    setToken() {
        // this.token = newToken;
    }
}
