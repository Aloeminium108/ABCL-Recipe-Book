import { createContext } from "react";

const AccountContext = createContext({
    loggedIn: false,
    setLoggedIn: (input: boolean) => {},
    user_id: null as number | null,
    setUserId: (input: number) => {},
    username: '',
    setUsername: (input: string) => {}
})

export default AccountContext