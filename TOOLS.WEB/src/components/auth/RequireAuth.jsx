import React from "react";
import { Navigate } from "react-router-dom";
import { useUserProvider } from "../store/context/UserContext";

function RequireAuth({ children }) {
    
    debugger
    const { user } = useUserProvider();

    return (
        user ? children : (<Navigate to="/signin" replace state={{path: location.pathname}} />)
    );
}

export default RequireAuth;