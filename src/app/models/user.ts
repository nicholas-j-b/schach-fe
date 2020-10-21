export class User {
    username: string;
    password: string;
    authData: string;
    authenticated: boolean;

    constructor(username: string, password: string, authData: string, authenticated: boolean = false) {
        this.username = username;
        this.password = password;
        this.authData = authData;
        this.authenticated = authenticated;
    }
}