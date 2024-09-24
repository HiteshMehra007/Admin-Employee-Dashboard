import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");

    const login = (user) =>{
        setIsAuthenticated(true);
        setUsername(user);
    }
    const logout = () =>{
        setIsAuthenticated(false);
        setUsername("");
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username }}>
            {children}
        </AuthContext.Provider>
    );
};
