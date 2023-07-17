import { useContext, useState } from "react";
import axios from 'axios'
import { AuthContext } from "../contexts/userContext";

export const useLogin = () => {

    const AuthContexts = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const { setUser } = AuthContexts;

    const login =  (name, password) => {
        setLoading(true);
        setError(null);

        axios.post("http://localhost:8800/login", 
        {name, password})
        .then((res)=>{
            setLoading(true);
            setError(null);
            setLoading(false)
            
            localStorage.setItem('user', JSON.stringify(res.data))

            // update the auth context
            setUser(name)
        })
        .catch((err) => {
            setError(err);
            setLoading(false);
        })
        
    }

    return {login, loading, error}
}
 