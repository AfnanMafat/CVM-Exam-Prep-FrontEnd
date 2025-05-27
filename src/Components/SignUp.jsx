import axios from 'axios';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import { EnvelopeIcon, LockClosedIcon, UserCircleIcon } from '@heroicons/react/24/outline';

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
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 transition-all duration-300 hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3)]">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center tracking-tight">
          Create Your Account
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="space-y-5">
            {/* Name Input */}
            <div className="relative">
              <UserCircleIcon className="h-5 w-5 absolute left-4 top-3.5 text-gray-400" />
              <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all placeholder-gray-400"
                placeholder="Full Name"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <EnvelopeIcon className="h-5 w-5 absolute left-4 top-3.5 text-gray-400" />
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all placeholder-gray-400"
                placeholder="Email Address"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 absolute left-4 top-3.5 text-gray-400" />
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all placeholder-gray-400"
                placeholder="Password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg"
          >
            Create Account
          </button>
        </form>

        <div className="mt-10">
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{' '}
            <Link 
              to="/" 
              className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-3 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;