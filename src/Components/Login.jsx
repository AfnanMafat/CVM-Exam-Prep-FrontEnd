import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserData } from "../ContextAPI/UserData";
import { EnvelopeIcon, LockClosedIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setIdG, setNameG, setEmailG, setPasswordG } = useContext(UserData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const User = {
      email: email,
      password: password,
    };

    try {
      axios.get(`http://localhost:8080/FindUserEmail/${email}`).then((res) => {
        const FindEmail = res.data.email;
        const FindPassword = res.data.password; 

        if (User.password == FindPassword && User.email == FindEmail) {
          setIdG(res.data.id)        
          setNameG(res.data.name);
          setEmailG(User.email);
          setPasswordG(User.password);
          navigate("/HomePage");
        }
      });
    } catch (e) {
      alert("Failed To Login");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)]">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-2">
          <ArrowRightOnRectangleIcon className="h-8 w-8 text-blue-600" />
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <EnvelopeIcon className="h-5 w-5 absolute left-4 top-3.5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       transition-all placeholder-gray-400"
              placeholder="Email Address"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <LockClosedIcon className="h-5 w-5 absolute left-4 top-3.5 text-gray-400" />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       transition-all placeholder-gray-400"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                     py-3 px-4 rounded-xl transition-all duration-300 transform 
                     hover:scale-[1.02] shadow-md hover:shadow-lg"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8">
          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link
              to="/SignUp"
              className="text-blue-600 hover:text-blue-700 font-semibold 
                         underline underline-offset-3 transition-colors"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
