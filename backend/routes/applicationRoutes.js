const router = require("express").Router()
const Application = require("../models/Application")

// GET all applications
router.get("/", async (req,res)=>{
 const applications = await Application.find()
 res.json(applications)
})

// CREATE application
router.post("/", async (req,res)=>{
 const application = new Application(req.body)
 await application.save()
 res.json({message:"Application submitted"})
})

module.exports = router