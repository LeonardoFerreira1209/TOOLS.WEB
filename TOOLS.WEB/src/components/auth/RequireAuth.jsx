import React from "react";
import { Navigate } from "react-router-dom";
import ContextUser from "../store/context/ContextUser";

function RequireAuth({ children }) {
    return (
        <ContextUser.Consumer>
            {
                userContext => (
                    userContext.user ? children : (<Navigate to="/signin" replace state={{path: location.pathname}} />)
                )
            }
        </ContextUser.Consumer>
    );
}

export default RequireAuth;