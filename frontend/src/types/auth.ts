export interface Auth {
    name: string;
    username: string;
    password: string;
    photo: string;
}

export interface LoginResponse {
    token: string;
    user: Auth;
}