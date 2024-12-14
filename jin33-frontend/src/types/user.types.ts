export interface User {
    id: string;
    username: string;
    email: string;
    avatar: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
    error: string | null;
} 