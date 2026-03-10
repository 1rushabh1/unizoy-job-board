import { useState } from "react"
import axios from "axios"

export default function ApplyForm({jobId}){

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [resumeLink,setResumeLink] = useState("")

  const apply = async () => {

    await axios.post("http://localhost:5000/api/apply",{
      jobId,
      name,
      email,
      resumeLink
    })

    alert("Application submitted")
  }

  return(

    <div>
      <input
        placeholder="Name"
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        placeholder="Resume Link"
        onChange={(e)=>setResumeLink(e.target.value)}
      />

      <button onClick={apply}>Apply</button>
    </div>

  )
}