import { useContext, useState } from "react";
import axios from 'axios'

export const useSignup = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const signup =  (name, password) => {
        setLoading(true);
        setError(null);

        axios.post(`http://localhost:8800/signup`, 
        {name, password})
        .then((res)=>{
            setLoading(true);
            setError(null);
            setLoading(false)
        })
        .catch((err) => {
            setError(err);
            setLoading(false);
        })
        
    }

    return {signup, loading, error}
}
 