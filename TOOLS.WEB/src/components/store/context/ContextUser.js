import { createContext } from "react";

const ContextUser = createContext({
    user: null,
    setUser: () => {},
    setRemove: () => {}
});

export default ContextUser;