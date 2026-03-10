import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Admin(){

const [title,setTitle] = useState("")
const [description,setDescription] = useState("")
const [jobs,setJobs] = useState([])
const [applications,setApplications] = useState([])
const [editingId,setEditingId] = useState(null)

const navigate = useNavigate()

const JOB_API = "https://unizoy-job-board1.onrender.com/api/jobs"
const APP_API = "https://unizoy-job-board1.onrender.com/api/apply"


// AUTH CHECK
useEffect(()=>{

const token = localStorage.getItem("token")

if(!token){
 navigate("/admin-login")
}else{
 fetchJobs()
 fetchApplications()
}

},[])


// FETCH JOBS
const fetchJobs = async ()=>{
 try{
 const res = await axios.get(JOB_API)
 setJobs(res.data)
 }catch(err){
 console.log(err)
 }
}


// FETCH APPLICATIONS
const fetchApplications = async ()=>{
 try{
 const res = await axios.get(APP_API)
 setApplications(res.data)
 }catch(err){
 console.log(err)
 }
}


// CREATE OR UPDATE JOB
const submitJob = async ()=>{

 try{

 if(editingId){

  await axios.put(`${JOB_API}/${editingId}`,{
   title,
   description
  })

  setEditingId(null)

 }else{

  await axios.post(JOB_API,{
   title,
   description
  })

 }

 setTitle("")
 setDescription("")
 fetchJobs()

 }catch(err){
 console.log(err)
 }

}


// DELETE JOB
const deleteJob = async(id)=>{

 try{

 await axios.delete(`${JOB_API}/${id}`)
 fetchJobs()

 }catch(err){
 console.log(err)
 }

}


// EDIT JOB
const editJob = (job)=>{
 setTitle(job.title)
 setDescription(job.description)
 setEditingId(job._id)
}


// LOGOUT
const logout = () => {

localStorage.removeItem("token")
navigate("/admin-login")

}


return(

<div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white p-10">

{/* HEADER */}

<div className="flex justify-between items-center mb-10">

<h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 text-transparent bg-clip-text">
Admin Dashboard
</h1>

<button
onClick={logout}
className="px-6 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition shadow-lg"
>
Logout
</button>

</div>



{/* CREATE JOB PANEL */}

<div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl mb-10">

<h2 className="text-2xl font-bold mb-6">
Create / Update Job
</h2>

<input
placeholder="Job Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
className="w-full mb-4 p-3 rounded-lg bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
/>

<textarea
placeholder="Job Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
className="w-full mb-6 p-3 rounded-lg bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
/>

<button
onClick={submitJob}
className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold shadow-lg hover:scale-105 transition"
>
{editingId ? "Update Job" : "Post Job"}
</button>

</div>



{/* JOB LIST */}

<div className="mb-12">

<h2 className="text-2xl font-bold mb-6">
Posted Jobs
</h2>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

{jobs.map(job=>(

<div
key={job._id}
className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl"
>

<h3 className="text-xl font-bold text-purple-300 mb-2">
{job.title}
</h3>

<p className="text-gray-300 mb-4">
{job.description}
</p>

<div className="flex gap-4">

<button
onClick={()=>editJob(job)}
className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
>
Edit
</button>

<button
onClick={()=>deleteJob(job._id)}
className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
>
Delete
</button>

</div>

</div>

))}

</div>

</div>



{/* APPLICATION LIST */}

<div>

<h2 className="text-2xl font-bold mb-6">
Candidate Applications
</h2>

{applications.length === 0 && (
<p className="text-gray-400">No applications yet</p>
)}

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

{applications.map(app => (

<div
key={app._id}
className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl"
>

<p className="mb-2"><b>Name:</b> {app.name}</p>

<p className="mb-2"><b>Email:</b> {app.email}</p>

<p className="mb-2">
<b>Resume:</b>{" "}
<a
href={app.resumeLink}
target="_blank"
className="text-purple-300 underline"
>
View Resume
</a>
</p>

<p><b>Job ID:</b> {app.jobId}</p>

</div>

))}

</div>

</div>

</div>

)

}