export interface Auth {
    name: string;
    username: string;
    password: string;
    photo: string;
}

export interface AuthState {
  token: string | null;
  user: Auth | null;
  isAuthenticated: boolean;
  loading: boolean;      
  error: string | null;  
}

export const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null
};
export interface LoginFormValues {
    username: string;
    password: string;
}
