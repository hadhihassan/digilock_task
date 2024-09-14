import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export interface AuthType {
    role: string,
    username: string
}


export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState<AuthType | null>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
            const data = JSON.parse(storedAuth)
            setAuth(() => data);
        }
    }, []);

    const login = (userData) => {
        setAuth(() => userData);
        console.log(userData, auth)
    };

    const logout = () => {
        setAuth(() => null);
        localStorage.removeItem('auth')
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};