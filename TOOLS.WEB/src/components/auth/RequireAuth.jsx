import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import StoreContext from "../store/context/ContextUser";

function RequireAuth({ children }) {
    const { user } = useContext(StoreContext)

    return user ? children : (<Navigate to="/signin" replace state={{path: location.pathname}} />);
}

export default RequireAuth;