import { createContext } from "react";

const Context = createContext({
    token: null,
    setToke: () => {}
});

export default Context;