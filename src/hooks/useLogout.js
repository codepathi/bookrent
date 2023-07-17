import { useContext, useState } from "react";
import axios from 'axios'
import { AuthContext } from "../contexts/userContext";

export const useLogout = () => {

    const AuthContexts = useContext(AuthContext);

    const { setUser } = AuthContexts;

    const logout =  () => {            
        localStorage.removeItem('user')
        setUser(null)
    }

    return {logout}
}
 