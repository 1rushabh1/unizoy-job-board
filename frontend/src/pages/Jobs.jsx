import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import ApplyForm from "../components/ApplyForm"

export default function Jobs() {

  const [jobs,setJobs] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    axios.get("https://unizoy-job-board1.onrender.com/api/jobs")
    .then(res=>setJobs(res.data))
    .catch(err=>console.log(err))
  },[])

  return(

    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white p-10">

      {/* Admin Login Button */}

      <div className="flex justify-end mb-6">
        <button
          onClick={()=>navigate("/admin-login")}
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold shadow-lg hover:scale-105 transition duration-300"
        >
          Admin Login
        </button>
      </div>


      {/* Hero Section */}

      <div className="text-center mb-16">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 text-transparent bg-clip-text">
          Unizoy Job Board
        </h1>

        <p className="text-gray-300 mt-4 text-lg max-w-xl mx-auto">
          Discover opportunities that shape the future. Apply to the most exciting roles and start building your dream career.
        </p>
      </div>


      {/* Job Cards */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

        {jobs.map(job => (

          <div
            key={job._id}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl hover:scale-105 hover:shadow-purple-500/30 transition duration-500"
          >

            <h3 className="text-2xl font-bold mb-3 text-purple-300">
              {job.title}
            </h3>

            <p className="text-gray-300 mb-6 leading-relaxed">
              {job.description}
            </p>

            <div className="border-t border-white/20 pt-6">
              <ApplyForm jobId={job._id}/>
            </div>

          </div>

        ))}

      </div>

    </div>

  )
}