import React from "react";
import { useState } from "react";
import './LoginPage.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;
const LoginPage = () => {
  const navigate = useNavigate()
  const redirectHomePage = ()=>{
    navigate('/Home', {
      state:{
        username: data.name
      }
    })
  }
  const [data, setData] = useState({ email: "", password: "" , name: ""});
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log({
      ...data,
      [e.target.name]: e.target.value, // ✅ show latest value in console
    });
  };
  
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(data.email.trim()=== ' ' || data.password.trim() === ''){
        return alert("please enter the data")
      }

      const response = await axios.post(
        "https://note-app-backend-igxr.onrender.com/api/login",
        data,
        { withCredentials: true }
      );
      data.name = response.data.name;
      console.log(data.name)
      redirectHomePage();
      setMessage(response.data.message || "Logged in !!!");
     
    } catch (error) {
      setMessage("something went wrong");
    }
  };

 
  const redirectSignup = ()=>{
    navigate('/Signup');
  }

  return (
   <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
  <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
    <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Welcome Back</h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email:
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400 outline-none"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password:
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400 outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition font-semibold"
      >
        Login
      </button>
    </form>

    <div className="text-center mt-4 text-sm text-gray-600">
      {message && <p className="mb-2 text-red-500">{message}</p>}
      Don’t have an account?{" "}
      <button
        onClick={redirectSignup}
        className="text-blue-500 font-medium hover:underline"
      >
        Create New Account
      </button>
    </div>
  </div>
</div>

  );
};

export default LoginPage;
