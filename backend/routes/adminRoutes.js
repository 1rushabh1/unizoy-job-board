const router = require("express").Router()
const Admin = require("../models/Admin")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const SECRET = "unizoy_secret"

// ADMIN LOGIN
router.post("/login", async (req,res)=>{

const {email,password} = req.body

const admin = await Admin.findOne({email})

if(!admin){
 return res.status(400).json({message:"Admin not found"})
}

const valid = await bcrypt.compare(password,admin.password)

if(!valid){
 return res.status(400).json({message:"Invalid password"})
}

const token = jwt.sign({id:admin._id},SECRET,{expiresIn:"1d"})

res.json({token})

})

module.exports = router