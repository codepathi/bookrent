import { useState } from 'react';
import SignUp from '../components/sign-up';
import Login from '../components/login';
const Form = () => {
    const [state, setState] = useState("signup")
    return (  
    <div className="formContainer">
    <div className="formItems">
    <div className="toggle">
      <span onClick={() => setState("signup")} className={state === 'signup' && 'selectedMenu'} >Sign up</span>
      <span onClick={() => setState("login")} className={state === 'login' && 'selectedMenu'}>Login</span>
    </div>
    { state === 'signup' ? <SignUp setState={setState}/> : <Login setState={setState}/>}
    </div>
    </div>
    );
}
 
export default Form;