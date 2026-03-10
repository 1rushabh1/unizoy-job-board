require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const jobRoutes = require("./routes/jobRoutes")
const applicationRoutes = require("./routes/applicationRoutes")
const adminRoutes = require("./routes/adminRoutes")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

app.use("/api/jobs", jobRoutes)
app.use("/api/apply", applicationRoutes)
app.use("/api/admin", adminRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})