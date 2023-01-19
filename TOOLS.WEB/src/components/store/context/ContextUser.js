import { createContext } from "react";

const ContextUser = createContext({
    user: null,
    setUser: () => {},
    setRemoveUser: () => {}
});

export default ContextUser;