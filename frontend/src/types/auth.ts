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

export interface LoginFormValues {
    username: string;
    password: string;
}
