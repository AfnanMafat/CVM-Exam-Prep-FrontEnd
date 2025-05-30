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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/3 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 transition-all duration-300 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.15)] border border-white">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl mr-3">
              <ArrowRightOnRectangleIcon className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Welcome Back
            </h1>
          </div>
          <p className="text-gray-600">Sign in to access your study materials</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative animate-fadeIn">
            <EnvelopeIcon className="h-5 w-5 absolute left-4 top-3.5 text-indigo-400" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-indigo-200 
                       focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 
                       transition-all placeholder-indigo-300 text-indigo-800 font-medium"
              placeholder="Email Address"
              required
            />
          </div>

          <div className="relative animate-fadeIn">
            <LockClosedIcon className="h-5 w-5 absolute left-4 top-3.5 text-indigo-400" />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-indigo-200 
                       focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 
                       transition-all placeholder-indigo-300 text-indigo-800 font-medium"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
                     text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform 
                     hover:scale-[1.02] shadow-lg hover:shadow-xl"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center animate-fadeIn">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/SignUp"
              className="text-indigo-600 hover:text-indigo-800 font-semibold 
                         transition-colors"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Login;