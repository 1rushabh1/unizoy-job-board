const router = require("express").Router()
const Job = require("../models/Job")

// Admin posts job
router.post("/", async (req, res) => {
  const job = new Job(req.body)
  await job.save()
  res.json(job)
})

// Browse jobs
router.get("/", async (req, res) => {
  const jobs = await Job.find()
  res.json(jobs)
})

// UPDATE JOB
router.put("/:id", async (req,res)=>{
  const updatedJob = await Job.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new:true }
  )
  res.json(updatedJob)
})

// DELETE JOB
router.delete("/:id", async (req,res)=>{
  await Job.findByIdAndDelete(req.params.id)
  res.json({message:"Job deleted"})
})

module.exports = router