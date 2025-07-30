import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignupPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
  name: "",
  email: "",
  password: ""
});
const [message, setMessage] = useState("")
const redirectHomePage = ()=>{
    navigate('/Home',{state:{username: data.name}})
  }
   const redirectLogin = ()=>{
    navigate('/');
  }
const handleChange = (e) => {
  setData({ ...data, [e.target.name]: e.target.value });
};
const handleSubmit = async (e)=>{
  e.preventDefault();
  try{
    const response = await axios.post('https://note-app-backend-igxr.onrender.com/api/signup', data,
        { withCredentials: true })
    redirectHomePage()
  }catch(error){
    // alert("error occured")
    setMessage ("login failed")

  }
  
}
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
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
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-600">
          {message && <p className="mb-2 text-green-500">{message}</p>}
          Already have an account?{" "}
          <button
            onClick={redirectLogin}
            className="text-blue-500 font-medium hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
