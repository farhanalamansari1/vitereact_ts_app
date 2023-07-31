"use client";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const SignupPage = () => {
  const navigate   = useNavigate();
  const [user, setuser] = React.useState({
    email: "",
    password: "",
    name: "",
  });
  const [buttonDisabled, setbuttonDisabled] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  useEffect(() => {
    
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.name.length > 0
    ) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);

  const onsignup = async (evt:any) => {
    evt.preventDefault();
    try {
      setloading(true);
      const response= await axios.post("http://localhost:5000/api/auth/createuser",user)
      console.log(response,"from signup api");
      toast.success("Signup SUccess");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setloading(false);
     
    }
  };

  const onchangeSubmit = (e: any) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <form onSubmit={onsignup}
      
      className="flex flex-col items-center justify-center min-h-screen py-2"
    >
      <h1 className="mx-3 my-6">{loading ? "Loading...." : "Signup"}</h1>

      <label htmlFor="name">Name</label>
      <input
        onChange={onchangeSubmit}
        name="name"
        type="text"
        className="p-2 border border-gray-300 rounded-lg
          mb-4 focus:outline-none focus:border-gray-600"
        id="name"
        aria-describedby="name"
        placeholder="Enter Name"
      />
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
        autoComplete="on"
      />

      <button
     
        type="submit"
        className="p-2 border border-gray-300 rounded-lg
          mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "NO Signup" : "Signup"}
      </button>

      <Link to="/login">Visit Login</Link>
    </form>
  );
};

export default SignupPage;
