const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const Admin = require("../models/Admin")

async function seedAdmin(){

  try{

    await mongoose.connect("mongodb://127.0.0.1:27017/unizoy_jobs")

    const existingAdmin = await Admin.findOne({
      email:"admin@unizoy.com"
    })

    if(existingAdmin){
      console.log("Admin already exists")
      process.exit()
    }

    const hashedPassword = await bcrypt.hash("123456",10)

    const admin = new Admin({
      email:"admin@unizoy.com",
      password:hashedPassword
    })

    await admin.save()

    console.log("Admin created successfully")

    process.exit()

  }catch(err){

    console.log(err)

    process.exit()

  }

}

seedAdmin()