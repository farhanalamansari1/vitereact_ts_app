"use client";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";


const Passwordforget = () => {
  const navigate   = useNavigate();
  const [user,setuser]=React.useState({
    email:"",
    password:""
  })
  const [buttonDisabled, setbuttonDisabled] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  useEffect(() => {
    
    if (
      user.email.length > 0 
     
    ) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);
  const onReset=async(evt:any)=>{
    evt.preventDefault();
    try {
      setloading(true);
      const response= await axios.post("/api/users/forgetPassword",user)
      console.log("forgetPassword SUccess",response.data)
      toast.success("Forget Password is Successfull");
      navigate("/login")
    } catch (error: any) {
      console.log("Forget Password Failed:", error.message);
      toast.error(error.message);
    } finally {
      setloading(false);
     
    }
  }
  const onchangeSubmit = (e:any) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };


  return (
    <form onSubmit={onReset} className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1 className="mx-3 my-6">{loading ? "Loading...." : "Forget Password"}</h1>
 
     
      
     
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
       
      

      <button  type="submit" className="p-2 border border-gray-300 rounded-lg
          mb-4 focus:outline-none focus:border-gray-600" >
         {buttonDisabled ? "Forget Password?" : "Reset"}
      </button>
      <Link to="/signup">Signup</Link>
  </form>
    
  )
}

export default Passwordforget