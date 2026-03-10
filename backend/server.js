require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const jobRoutes = require("./routes/jobRoutes")
const applicationRoutes = require("./routes/applicationRoutes")
const adminRoutes = require("./routes/adminRoutes")

const app = express()

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}))

app.use(express.json())


/* ---------------- ROUTES ---------------- */

app.use("/api/jobs", jobRoutes)
app.use("/api/apply", applicationRoutes)
app.use("/api/admin", adminRoutes)


/* ---------------- HEALTH CHECK ---------------- */

app.get("/", (req,res)=>{
  res.send("Unizoy Job Board API Running")
})


/* ---------------- DATABASE CONNECTION ---------------- */

mongoose.connect(process.env.MONGO_URI)
.then(()=>{

  console.log("MongoDB Connected")

  const PORT = process.env.PORT || 5000

  app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
  })

})
.catch(err=>{
  console.error("MongoDB Connection Error:", err)
})


/* ---------------- GLOBAL ERROR HANDLER ---------------- */

app.use((err,req,res,next)=>{
  console.error(err.stack)

  res.status(500).json({
    message: "Something went wrong on the server"
  })
})