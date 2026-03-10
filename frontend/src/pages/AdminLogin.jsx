import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function AdminLogin(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()

  const login = async ()=>{

    try{

      const res = await axios.post(
        "https://unizoy-job-board-backend11.onrender.com/api/admin/login",
        { email, password }
      )

      localStorage.setItem("token",res.data.token)

      navigate("/admin")

    }catch(err){
      alert("Login failed")
    }

  }

  return(

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white p-6">

      {/* Login Card */}

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-10 w-full max-w-md">

        {/* Title */}

        <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 text-transparent bg-clip-text">
          Admin Login
        </h2>


        {/* Email Input */}

        <input
          type="email"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
        />


        {/* Password Input */}

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full mb-6 p-3 rounded-lg bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
        />


        {/* Login Button */}

        <button
          onClick={login}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold shadow-lg hover:scale-105 transition duration-300"
        >
          Login
        </button>

      </div>

    </div>

  )
}