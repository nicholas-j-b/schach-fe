export class User {
    username: string;
    password: string;
    authData: string;

    constructor(username: string, password: string, authData: string) {
        this.username = username;
        this.password = password;
        this.authData = authData;
    }
}