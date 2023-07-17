import { useSignup } from "../hooks/useSignup";
import '../styles/form.css'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/userContext";
import { useEffect } from "react";
const SignUp = ({setState}) => {

    const {signup, loading, error} = useSignup();
    const navigate = useNavigate();

    const AuthContexts = useContext(AuthContext);
    const { user } = AuthContexts;

    useEffect(() => {
        if(user) {
            navigate("/dashboard");
        }
    }, [user])
    
    const onSubmit = async (e) => {
        e.preventDefault();

        const user = {
            name: e.target[0].value,
            password: e.target[1].value
        }

        await signup(user.name, user.password)
    }

    return ( 
        <form onSubmit={onSubmit} className="authForm">
            <div className="formItem">
            <label htmlFor="name">username</label>
            <input type="text" name="name" className="authInput"/> <br />
            </div>
            <div className="formItem">
            <label htmlFor="password" name="password">password</label>
            <input type="password" name="password" id="password" className="authInput" /><br />
            </div>
            <div>
            <span>{error}</span>
            <button type="submit" className="authBtn">Create account</button>
            <span style={{fontSize: '12px'}}>Already have an account? <span onClick={() => setState('login')} style={{color: "#DF1F26", cursor: "pointer"}}>login</span> </span>
            
            </div>
        </form>
     );
}
 
export default SignUp;