"use client";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from 'js-cookie'

const LoginPage = () => {
 
  const navigate   = useNavigate();
  const [user,setuser]=React.useState({
    email:"",
    password:""
  })
  const [buttonDisabled, setbuttonDisabled] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  useEffect(() => {
    
    if (
      user.email.length > 0 &&
      user.password.length > 0 
     
    ) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);
  const onlogin=async(evt:any)=>{
    evt.preventDefault();
    try {
      setloading(true);
      const response= await axios.post("http://localhost:5000/api/auth/login",user)
      //seting cookie
      
Cookies.set("token", response.data.authToken) 
      console.log("Login SUccess",response.data)
      toast.success("Login SUccess");
      navigate("/profile")
    } catch (error: any) {
      console.log("Login Failed:", error.message);
      toast.error(error.message);
    } finally {
      setloading(false);
     
    }
  }
  const onchangeSubmit = (e:any) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };
  return (
  <form onSubmit={onlogin} className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1 className="mx-3 my-6">{loading ? "Loading...." : "Login"}</h1>
 
     
      
     
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          onChange={onchangeSubmit}
          name="email"
          type="email"
          className="p-2 border border-gray-300 rounded-lg
          mb-4 focus:outline-none focus:border-gray-600"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
      

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
        />
    
     
      

      <button  type="submit" className="p-2 border border-gray-300 rounded-lg
          mb-4 focus:outline-none focus:border-gray-600">
         {buttonDisabled ? "NO Login" : "Login"}
      </button>
      <Link to="/signup">Signup Here</Link>

      <Link className="btn btn-primary" to="/fogetpassword">Reset Your Password Here</Link>
  </form>
    
  )
}

export default LoginPage
