import { createContext } from "react";

const ContextUser = createContext({
    user: null,
    setUser: () => {}
});

export default ContextUser;