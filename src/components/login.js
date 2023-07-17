import { useEffect } from "react";
import { useLogin  } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/userContext";

const Login = ({setState}) => {

    const {login, loading, error} = useLogin();
    const navigate = useNavigate();

    const AuthContexts = useContext(AuthContext);
    const { user } = AuthContexts;

    useEffect(() => {
        if(user != null) {
            navigate("/dashboard");
        }
    }, [user])
    
    
    const onSubmit = async (e) => {
        e.preventDefault();

        const user = {
            name: e.target[0].value,
            password: e.target[1].value
        }

        await login(user.name, user.password)
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
            <button type="submit" className="authBtn"> Login </button>
            <span style={{fontSize: '12px'}}>Don't have an account? <span onClick={() => setState('signup')} style={{color: "#DF1F26", cursor: "pointer"}}>signup</span> </span>
            </div>
        </form>
     );
}
 
export default Login;