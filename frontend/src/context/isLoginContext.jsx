import { createContext, useState, useContext, useEffect } from 'react';

// Creating context
const AppContext = createContext();

// Creating context provider
export const AppProvider = ({ children }) => {
    const [isLoginIn, setLoginIn] = useState(false);
    const [showPopUp, setShowPopUp] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('jwt_token') !== null) {
            setLoginIn(true);
            setShowPopUp(false);
        }
       
    }, []); // Runs only on mount

    const value = {
        isLoginIn,
        setLoginIn,
        showPopUp,
        setShowPopUp,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use context
export const useAppContext = () => useContext(AppContext);
