import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import StoreContext from "../store/Context";

function RequireAuth({ children }) {
    const { token } = useContext(StoreContext)

    return token ? children : (<Navigate to="/signin" replace state={{path: location.pathname}} />);
}

export default RequireAuth;