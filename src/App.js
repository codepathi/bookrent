import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Form from './pages/form';
import Dashboard from './pages/dashboard';
import NavbarMain from './components/navbar';
import { useContext } from "react";
import { AuthContext } from "./contexts/userContext";
import { useEffect } from 'react';

function App() {

  const navigate = useNavigate();

    const AuthContexts = useContext(AuthContext);
    const { user, setUser } = AuthContexts;

    const loggedInUser = localStorage.getItem('user');

    
    useEffect(() => {

      if(loggedInUser){
        if(!JSON.parse(loggedInUser).name) {
          navigate("/");
        }
        else{
          setUser(JSON.parse(loggedInUser).name)
          navigate("/dashboard");
        }
      }

      
    }, [user])
  
  return (
    <div className="App">
      <NavbarMain />
      <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </div>
  );
}

export default App;
