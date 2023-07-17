import { useContext, useState } from "react";
import axios from 'axios'
import { AuthContext } from "../contexts/userContext";

export const useSignup = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const AuthContexts = useContext(AuthContext);
    const { setUser } = AuthContexts;

    const signup =  (name, password) => {
        setLoading(true);
        setError(null);

        axios.post(`http://localhost:8800/signup`, 
        {name, password})
        .then((res)=>{
            setLoading(true);
            setError(null);
            setLoading(false)

            localStorage.setItem('user', JSON.stringify(name))
            
            // update the auth context
            setUser(name)
        })
        .catch((err) => {
            setError(err);
            setLoading(false);
        })
        
    }

    return {signup, loading, error}
}
 