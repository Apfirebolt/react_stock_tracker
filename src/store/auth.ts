import { atom } from 'jotai';

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    token: string;
    roles?: string[];
}

export interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
}

const authAtom = atom<AuthState>({
    user: null,
    isAuthenticated: false,
});

export { authAtom };
