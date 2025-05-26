import axios from 'axios';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';

const SignUp = () => {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    const User = {
        'name': name,
        'email' : email,
        'password' : password
    }

    try {
        axios.get(`http://localhost:8080/FindUserEmail/${email}`).then((res)=>{
        console.log(res);

        axios.post("http://localhost:8080/AddUser",User)
        
        navigate("/")
        
    })
    } catch (e) {
        console.log(e);
        
        alert("User Exist")
      
        navigate("/SignUp")

    }

  
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Create Your Account
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              onChange={(e)=>{setName(e.target.value)}}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter Name"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              onChange={(e)=>{setEmail(e.target.value)}}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter Email"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={(e)=>{setPassword(e.target.value)}}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.01]"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
    
              </span>
            </div>
          </div>

          <p className="mt-8 text-center text-gray-600">
            Already have an account?{' '}
            <a href="#" className="text-blue-600 hover:underline font-semibold">
              <Link to={"/"}>Sign In</Link>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;