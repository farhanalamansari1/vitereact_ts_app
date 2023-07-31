"use client";
import axios from "axios";
import { Link } from "react-router-dom";
import React,{useEffect,useState} from "react";


export default function resetPassword() {
    const [token,setToken]=useState("");
    const [verified,setVerified]=useState(false);
    const [error,setError]=useState(false);
    const [user, setuser] = React.useState({
            password: ""
    });
    const onchangeSubmit = (e: any) => {
      setuser({ ...user, [e.target.name]: e.target.value });
    };
    
    useEffect(()=>{
        const urlToken=window.location.search.split("=")
        [1];
        setToken(urlToken || "");
             },[]);
             useEffect(()=>{
              if(user.password.length>0){
                  ResetUserPassword("");
              }
              },[token]);  
              const ResetUserPassword=async (evt:any)=>{
                evt.preventDefault();
                try {
                  // console.log(user,"my password sy",mypassword);
                    await axios.post('/api/users/resetPassword',{token,password:user.password})
                    setVerified(true);
                    console.log(verified,"hogaya verify")
                } catch (error:any) {
                    setError(true);
                    console.log(verified,"verify nahe hwa")
                    console.log(error.response.data);
                }
               
            }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1 className="text-4xl">Password Reset</h1>

    <label htmlFor="Password">Password</label>
      <input
        onChange={onchangeSubmit}
        name="password"
        type="password"
        className="p-2 border border-gray-300 rounded-lg
          mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        placeholder="Enter Password"
        minLength={5}
        required
        autoComplete="on"
      />

<button
     
     type="submit"
     className="p-2 border border-gray-300 rounded-lg
       mb-4 focus:outline-none focus:border-gray-600" onClick={ResetUserPassword}
   >
   Reset Password
   </button>


    <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}`:"no token"}
    </h2>
    {verified &&(
        <div>
            <h2 className="text-2xl"> EMAIL IS VERIFIED</h2>
            <Link to="/login">Login</Link>
        </div>
    )}
      {error &&(
        <div>
            <h2 className="text-2xl bg-red-500"> Error</h2>
            
        </div>
    )}
</div>
  )
}
