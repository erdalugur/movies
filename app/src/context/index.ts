import React from 'react';
export interface AuthState {
    token: string | null | undefined
}
export interface AuthAction {
    type: string
    token: string | null | undefined
}

export const AuthContext = React.createContext<{
    signIn: (data: any) => Promise<void>
    signOut: () => void;
    getState: () => AuthState
}>({
    signIn: (data: any) => Promise.resolve(),
    signOut: () => null,
    getState: () => {
        return {
            token: ''
        }
    }
});

export const useAuthentication = () => React.useContext(AuthContext)