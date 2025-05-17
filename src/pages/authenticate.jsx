//5aso bil login
import{React,useState,useContext,useEffect} from "react";
import RegisterForm from "../components/register-form/register-form";
import LogInForm from "../components/login-form/login-form";
import {MainContext} from "../utils/context";
import { useNavigate } from "react-router-dom";
function Authenticate(){
    const [registerMode,setRegisterMode]=useState(false);
    const {user,loading}=useContext(MainContext);
    const navigate=useNavigate();
    useEffect(()=>{
        !loading && user && navigate('/');
    },[loading,user])
   return registerMode ? (
   <div className="authenticate">
    <RegisterForm/>
    <p>
        Already have an account?
        <b className="authenticate__anchor" onClick={()=>setRegisterMode(false)}>  Login</b>
    </p>
   </div>)
   :(
    <div className="authenticate">
        <LogInForm/>
        <p>
            Don't have an account?
        <b className="authenticate__anchor" onClick={()=>setRegisterMode(true)}>  Register</b> 
        </p>
    </div>
   );
   

}
export default Authenticate;